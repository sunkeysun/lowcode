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
      this.designer.shellManager.subscribeEvent(
        DragStartEvent,
        this.handleDragStart,
      ),
      this.designer.shellManager.subscribeEvent(
        DragEndEvent,
        this.handleDragEnd,
      ),
      this.designer.shellManager.subscribeEvent(
        DragOverEvent,
        this.handleDragOver,
      ),
      this.designer.shellManager.subscribeEvent(
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
    const nodeDom = this.designer.documentModel?.getNodeDom(node.id)
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
            this.designer.documentModel?.getNodeDom(beforeChildId)
          if (beforeNodeDom) {
            nodeId = beforeChildId
            alignDirection = this.getAlignDirection(beforeNodeDom)
            alignPosition = alignDirection === 'vertical' ? 'bottom' : 'right'
          }
        } else if (afterChildId) {
          const afterNodeDom =
            this.designer.documentModel?.getNodeDom(afterChildId)
          if (afterNodeDom) {
            nodeId = afterChildId
            alignDirection = this.getAlignDirection(afterNodeDom)
            alignPosition = alignDirection === 'vertical' ? 'top' : 'left'
          }
        }
      }
    } else {
      nodeId = node.id
      const nodeDom = this.designer.documentModel?.getNodeDom(node.id)
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
      const childDom = this.designer.documentModel?.getNodeDom(childId)
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
    const draggingTarget = this.designer.documentModel?.getDragingTarget()
    if (!draggingTarget) return
    let componentName = ''

    if (draggingTarget.type === 'resource') {
      const resource = this.designer.materialManager.getResource(
        draggingTarget.id,
      )
      if (!resource) return
      componentName = resource.schema.componentName
    } else {
      const draggingNode = this.designer.documentModel?.getNode(
        draggingTarget.id,
      )
      if (!draggingNode) return
      componentName = draggingNode.id
    }

    let targetNode = this.designer.documentModel?.getNode(nodeId)
    if (targetNode?.componentName === 'Slot') return true
    if (alignPosition !== 'in') {
      const parentId = targetNode?.parentId
      if (!parentId) return
      targetNode = this.designer.documentModel?.getNode(parentId)
    }

    if (!targetNode) return
    const componentMeta =
      this.designer.materialManager.getComponentMeta(componentName)
    const componentBehavior =
      this.designer.materialManager.getComponentBehavior(
        targetNode.componentName,
      )
    console.log(componentMeta, componentBehavior, componentBehavior?.canDrop(componentMeta!), '99999')

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
    this.designer.documentModel?.setDraggingTarget(target)
  }

  handleDragOver = (event: DragOverEvent) => {
    const {
      eventData: { target, nativeEvent },
    } = event
    const node = this.designer.documentModel?.getNode(target.id)
    if (!node) return

    const nodeAlignData = this.getNodeAlignData(nativeEvent, node)
    if (
      !nodeAlignData ||
      !nodeAlignData.nodeId ||
      !nodeAlignData.alignPosition ||
      !nodeAlignData.alignDirection
    )
      return

    const { nodeId, alignPosition, alignDirection } = nodeAlignData
    const targetNode = this.designer.documentModel?.getNode(nodeId)
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
    this.designer.documentModel?.setDragoverTarget(dragoverTarget)
  }

  handleDragEnd = () => {
    const draggingTarget = this.designer.documentModel?.getDragingTarget()
    const dragoverTarget = this.designer.documentModel?.getDragoverTarget()
    this.designer.documentModel?.setDraggingTarget(null)
    this.designer.documentModel?.setDragoverTarget(null)

    if (!draggingTarget || dragoverTarget?.acceptStatus !== 'accept') {
      return
    }

    const node = this.designer.documentModel?.getNode(dragoverTarget.nodeId)
    if (!node) return

    let draggingNode = null
    if (draggingTarget.type === 'resource') {
      const resource = this.designer.materialManager.getResource(
        draggingTarget.id,
      )
      if (!resource) return
      draggingNode = this.designer.documentModel?.createNode(
        resource.schema,
        null,
      )
    } else {
      draggingNode = this.designer.documentModel?.getNode(draggingTarget.id)
    }

    if (!draggingNode) return

    if (dragoverTarget.alignPosition === 'in') {
      this.designer.documentModel?.appendChild({
        ...draggingNode,
        parentId: node.id,
      })
    } else {
      if (!node.parentId) return
      switch (dragoverTarget.alignPosition) {
        case 'top':
        case 'left':
          this.designer.documentModel?.insertBefore(
            { ...draggingNode, parentId: node.parentId },
            node.id,
          )
          break
        case 'bottom':
        case 'right':
          this.designer.documentModel?.insertAfter(
            { ...draggingNode, parentId: node.parentId },
            node.id,
          )
          break
      }
    }
  }

  handleDragLeave = () => {
    this.designer.documentModel?.setDragoverTarget(null)
  }

  destroy() {
    this.#unsubscribers.forEach((unsubscribe) => unsubscribe())
    this.#unsubscribers = []
  }
}
