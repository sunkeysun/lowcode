/**
 * 拖拽插件
 */
import type {
  AcceptStatus,
  DragoverTarget,
  LayoutDirection,
  LayoutPosition,
} from '../types'
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

  getLayoutData(ev: MouseEvent, node: NodeEntity) {
    const nodeDom = this.designer.documentModel?.getNodeDom(node.id)
    if (!nodeDom) return null
    const domRect = nodeDom.getBoundingClientRect()
    const { offsetX, offsetY } = ev
    const { width, height } = domRect

    let nodeId: string | null = null
    let layoutPosition: LayoutPosition | null = null
    let layoutDirection: LayoutDirection = 'V'

    if (this.isInRect(ev, domRect)) {
      // 鼠标在内容区
      nodeId = node.id
      if (!node.childrenIds?.length) {
        layoutPosition = 'In'
      } else {
        // 存在 children 则计算相对 children 的插入位置
        const afterChildId = this.getNearestChild(ev, node, 'after')
        const beforeIndex = afterChildId
          ? node.childrenIds.findIndex((id) => id === afterChildId) - 1
          : node.childrenIds.length - 1
        const beforeChildId = node.childrenIds[beforeIndex]
        if (beforeChildId) {
          const beforeNodeDom =
            this.designer.documentModel?.getNodeDom(beforeChildId)
          if (beforeNodeDom) {
            nodeId = beforeChildId
            layoutDirection = this.getLayoutDirection(beforeNodeDom)
            layoutPosition = layoutDirection === 'V' ? 'Bottom' : 'Right'
          }
        } else if (afterChildId) {
          const afterNodeDom =
            this.designer.documentModel?.getNodeDom(afterChildId)
          if (afterNodeDom) {
            nodeId = afterChildId
            layoutDirection = this.getLayoutDirection(afterNodeDom)
            layoutPosition = layoutDirection === 'V' ? 'Top' : 'Left'
          }
        }
      }
    } else {
      nodeId = node.id
      const nodeDom = this.designer.documentModel?.getNodeDom(node.id)
      layoutDirection = this.getLayoutDirection(nodeDom)
      if (layoutDirection === 'V') {
        // 垂直排列
        if (offsetY / (height - offsetY) <= 1) {
          layoutPosition = 'Top'
        } else {
          layoutPosition = 'Bottom'
        }
      } else {
        // 水平排列
        if (offsetX / (width - offsetX) <= 1) {
          layoutPosition = 'Left'
        } else {
          layoutPosition = 'Right'
        }
      }
    }
    return { nodeId, layoutPosition, layoutDirection }
  }

  getLayoutDirection(nodeDom?: HTMLElement): LayoutDirection {
    if (!nodeDom || !nodeDom.parentElement) {
      return 'V'
    }
    const computedStyle = getComputedStyle(nodeDom)
    const parentComputedStyle = getComputedStyle(nodeDom.parentElement)

    if (
      (parentComputedStyle.display === 'flex' &&
        parentComputedStyle.flexDirection === 'row') ||
      ['inline-block', 'inline'].includes(computedStyle.display) ||
      computedStyle.float !== 'none'
    ) {
      return 'H'
    }

    return 'V'
  }

  getNearestChild(
    ev: MouseEvent,
    parentNode: NodeEntity,
    nearType: 'before' | 'after',
  ) {
    const { childrenIds = [] } = parentNode
    const { clientX, clientY } = ev
    const childId = childrenIds.find((childId) => {
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

  getAcceptType(): AcceptStatus {
    return 'accept'
  }

  handleDragStart = (event: DragStartEvent) => {
    const {
      eventData: { target },
    } = event
    let dragNode = null
    if (target.type === 'component') {
      dragNode = this.designer.documentModel?.createNode(target.id)
    } else {
      dragNode = this.designer.documentModel?.getNode(target.id)
    }

    if (dragNode) {
      this.designer.documentModel?.setDraggingTarget(dragNode)
    }
  }

  handleDragOver = (event: DragOverEvent) => {
    const {
      eventData: { target, nativeEvent },
    } = event
    const node = this.designer.documentModel?.getNode(target.id)
    if (!node) return

    const layoutData = this.getLayoutData(nativeEvent, node)
    if (
      !layoutData ||
      !layoutData.nodeId ||
      !layoutData.layoutPosition ||
      !layoutData.layoutDirection
    )
      return

    const { nodeId, layoutPosition, layoutDirection } = layoutData
    const targetNode = this.designer.documentModel?.getNode(nodeId)
    if (!targetNode) return
    const acceptStatus =
      layoutPosition !== 'In' && !targetNode.parentId
        ? 'reject'
        : this.getAcceptType()
    const dragoverTarget: DragoverTarget = {
      nodeId,
      acceptStatus,
      layoutPosition,
      layoutDirection,
    }
    this.designer.documentModel?.setDragoverTarget(dragoverTarget)
  }

  handleDragEnd = () => {
    const draggingTarget = this.designer.documentModel?.getDragingTarget()
    const dragoverTarget = this.designer.documentModel?.getDragoverTarget()

    if (draggingTarget && dragoverTarget?.acceptStatus === 'accept') {
      const node = this.designer.documentModel?.getNode(dragoverTarget.nodeId)
      if (!node) return
      if (dragoverTarget.layoutPosition === 'In') {
        this.designer.documentModel?.appendChild(draggingTarget, node.id)
      } else if (
        ['Left', 'Top'].includes(dragoverTarget.layoutPosition) &&
        node.parentId
      ) {
        this.designer.documentModel?.insertBefore(
          node.parentId,
          draggingTarget,
          node.id,
        )
      } else if (
        ['Right', 'Bottom'].includes(dragoverTarget.layoutPosition) &&
        node.parentId
      ) {
        this.designer.documentModel?.insertAfter(
          node.parentId,
          draggingTarget,
          node.id,
        )
      }
    }

    this.designer.documentModel?.setDraggingTarget(null)
    this.designer.documentModel?.setDragoverTarget(null)
  }

  handleDragLeave = () => {
    this.designer.documentModel?.setDragoverTarget(null)
  }

  destroy() {
    this.#unsubscribers.forEach((uninstall) => uninstall())
    this.#unsubscribers = []
  }
}
