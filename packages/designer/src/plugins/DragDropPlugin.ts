/**
 * 拖拽插件
 */
import type { DragoverTarget, AlignDirection, AlignPosition } from '../types'
import { Designer } from '..'
import { Plugin } from './Plugin'
import {
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  DragLeaveEvent,
} from '../shell'
import { NodeEntity } from '../store/entities/node'

export class DragDropPlugin extends Plugin {
  #unsubscribers: Array<() => void> = []

  constructor(private readonly designer: Designer) {
    super()
    this.#unsubscribers.push(
      this.designer.shell.subscribeEvent(
        DragStartEvent,
        this.handleDragStart,
      ),
      this.designer.shell.subscribeEvent(
        DragEndEvent,
        this.handleDragEnd,
      ),
      this.designer.shell.subscribeEvent(
        DragOverEvent,
        this.handleDragOver,
      ),
      this.designer.shell.subscribeEvent(
        DragLeaveEvent,
        this.handleDragLeave,
      ),
    )
  }

  getPadding(size: number) {
    const maxPadding = 20
    const minPadding = 3
    const paddingRadio = 0.15
    const padding = Math.min(
      Math.max(size * paddingRadio, minPadding),
      maxPadding,
    )
    return padding
  }

  isInRect(ev: MouseEvent, domRect: DOMRect) {
    const { clientX, clientY } = ev
    const { top, left, width, height } = domRect
    const paddingX = this.getPadding(width)
    const paddingY = this.getPadding(height)

    if (
      clientX - left > paddingX &&
      clientX - left < width - paddingX &&
      clientY - top > paddingY &&
      clientY - top < height - paddingY
    ) {
      return true
    }
    return false
  }

  getNodeAlignData(ev: MouseEvent, node: NodeEntity) {
    const nodeDom = this.designer.document?.getNodeDom(node.id)
    if (!nodeDom) return null
    const domRect = nodeDom.getBoundingClientRect()
    const { offsetX, offsetY } = ev
    const { width, height } = domRect

    let nodeId: string | null = null
    let alignPosition: AlignPosition | null = null
    let alignDirection: AlignDirection = 'vertical'

    if (this.isInRect(ev, domRect)) {
      // 鼠标在内容区
      nodeId = node.id
      if (!node.childIds?.length) {
        alignPosition = 'in'
      } else {
        // 存在 children 则计算相对 children 的插入位置
        const afterChildId = this.getNearestChild(ev, node, 'after')
        const beforeIndex = afterChildId
          ? node.childIds.findIndex((id) => id === afterChildId) - 1
          : node.childIds.length - 1
        const beforeChildId = node.childIds[beforeIndex]
        if (beforeChildId) {
          const beforeNodeDom =
            this.designer.document?.getNodeDom(beforeChildId)
          if (beforeNodeDom) {
            nodeId = beforeChildId
            alignDirection = this.getAlignDirection(beforeNodeDom)
            alignPosition = alignDirection === 'vertical' ? 'bottom' : 'right'
          }
        } else if (afterChildId) {
          const afterNodeDom =
            this.designer.document?.getNodeDom(afterChildId)
          if (afterNodeDom) {
            nodeId = afterChildId
            alignDirection = this.getAlignDirection(afterNodeDom)
            alignPosition = alignDirection === 'vertical' ? 'top' : 'left'
          }
        }
      }
    } else {
      nodeId = node.id
      const nodeDom = this.designer.document?.getNodeDom(node.id)
      alignDirection = this.getAlignDirection(nodeDom)
      if (alignDirection === 'vertical') {
        if (offsetY / (height - offsetY) <= 1) {
          alignPosition = 'top'
        } else {
          alignPosition = 'bottom'
        }
      } else {
        if (offsetX / (width - offsetX) <= 1) {
          alignPosition = 'left'
        } else {
          alignPosition = 'right'
        }
      }
    }
    return { nodeId, alignPosition, alignDirection }
  }

  getAlignDirection(nodeDom?: HTMLElement): AlignDirection {
    if (!nodeDom || !nodeDom.parentElement) {
      return 'vertical'
    }
    const computedStyle = getComputedStyle(nodeDom)
    const parentComputedStyle = getComputedStyle(nodeDom.parentElement)

    if (
      (parentComputedStyle.display === 'flex' &&
        parentComputedStyle.flexDirection === 'row') ||
      ['inline-block', 'inline'].includes(computedStyle.display) ||
      computedStyle.float !== 'none'
    ) {
      return 'horizontal'
    }

    return 'vertical'
  }

  getNearestChild(
    ev: MouseEvent,
    parentNode: NodeEntity,
    nearType: 'before' | 'after',
  ) {
    const { childIds = [] } = parentNode
    const { clientX, clientY } = ev
    const childId = childIds.find((childId) => {
      const childDom = this.designer.document?.getNodeDom(childId)
      if (!childDom) return false
      const { top, left, right, bottom } = childDom.getBoundingClientRect()
      if (nearType === 'after' && (clientY < top || clientX < left)) {
        return true
      }
      if (nearType === 'before' && (clientY > bottom || clientX > right)) {
        return true
      }
      return false
    })
    return childId
  }

  canAccept({
    nodeId,
    alignPosition,
  }: {
    nodeId: string
    alignPosition: AlignPosition | null
  }) {
    const draggingTarget = this.designer.document?.getDragingTarget()
    if (!draggingTarget) return
    let componentName = ''

    if (draggingTarget.type === 'resource') {
      const resource = this.designer.material.getResource(
        draggingTarget.id,
      )
      if (!resource) return
      componentName = resource.schema.componentName
    } else {
      const draggingNode = this.designer.document?.getNode(
        draggingTarget.id,
      )
      if (!draggingNode) return
      componentName = draggingNode.id
    }

    let targetNode = this.designer.document?.getNode(nodeId)
    if (targetNode?.componentName === 'Slot') return true
    if (alignPosition !== 'in') {
      const parentId = targetNode?.parentId
      if (!parentId) return
      targetNode = this.designer.document?.getNode(parentId)
    }

    if (!targetNode) return
    const componentMeta =
      this.designer.material.getComponentMeta(componentName)
    const componentBehavior =
      this.designer.material.getComponentBehavior(
        targetNode.componentName,
      )

    if (
      !componentMeta ||
      !componentBehavior ||
      !componentBehavior.canDrop(componentMeta)
    )
      return false
    return true
  }

  handleDragStart = (event: DragStartEvent) => {
    const {
      eventData: { target },
    } = event
    this.designer.document?.setDraggingTarget(target)
  }

  handleDragOver = (event: DragOverEvent) => {
    const {
      eventData: { target, nativeEvent },
    } = event
    const node = this.designer.document?.getNode(target.id)
    if (!node) return

    let nodeAlignData = null
    if (node.componentName === 'Slot') {
      nodeAlignData = {
        nodeId: node.id,
        alignPosition: 'in' as const,
        alignDirection: 'vertical' as const,
      }
    } else {
      nodeAlignData = this.getNodeAlignData(nativeEvent, node)
    }
    if (
      !nodeAlignData ||
      !nodeAlignData.nodeId ||
      !nodeAlignData.alignPosition ||
      !nodeAlignData.alignDirection
    )
      return

    const { nodeId, alignPosition, alignDirection } = nodeAlignData
    const targetNode = this.designer.document?.getNode(nodeId)
    if (!targetNode) return
    const acceptStatus =
      alignPosition !== 'in' && !targetNode.parentId
        ? 'reject'
        : this.canAccept(nodeAlignData)
        ? 'accept'
        : 'reject'
    const dragoverTarget: DragoverTarget = {
      nodeId,
      acceptStatus,
      alignPosition,
      alignDirection,
    }
    this.designer.document?.setDragoverTarget(dragoverTarget)
  }

  handleDragEnd = () => {
    const draggingTarget = this.designer.document?.getDragingTarget()
    const dragoverTarget = this.designer.document?.getDragoverTarget()
    this.designer.document?.setDraggingTarget(null)
    this.designer.document?.setDragoverTarget(null)

    if (!draggingTarget || dragoverTarget?.acceptStatus !== 'accept') {
      return
    }

    const node = this.designer.document?.getNode(dragoverTarget.nodeId)
    if (!node) return

    let draggingNode = null
    if (draggingTarget.type === 'resource') {
      const resource = this.designer.material.getResource(
        draggingTarget.id,
      )
      if (!resource) return
      draggingNode = this.designer.document?.createNode(
        resource.schema,
        null,
      )
    } else {
      draggingNode = this.designer.document?.getNode(draggingTarget.id)
    }

    if (!draggingNode) return

    if (dragoverTarget.alignPosition === 'in') {
      this.designer.document?.appendChild({
        ...draggingNode,
        parentId: node.id,
      })
    } else {
      if (!node.parentId) return
      switch (dragoverTarget.alignPosition) {
        case 'top':
        case 'left':
          this.designer.document?.insertBefore(
            { ...draggingNode, parentId: node.parentId },
            node.id,
          )
          break
        case 'bottom':
        case 'right':
          this.designer.document?.insertAfter(
            { ...draggingNode, parentId: node.parentId },
            node.id,
          )
          break
      }
    }
  }

  handleDragLeave = () => {
    this.designer.document?.setDragoverTarget(null)
  }

  destroy() {
    this.#unsubscribers.forEach((unsubscribe) => unsubscribe())
    this.#unsubscribers = []
  }
}
