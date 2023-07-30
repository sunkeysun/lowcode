/**
 * 拖拽插件
 */
import { Designer } from '..'
import { Plugin } from './Plugin'
import {
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  DragLeaveEvent,
} from '../shell'
import { DragoverTarget } from '../types'

function getAtPosition(ev: MouseEvent, dom?: HTMLElement) {
  if (!ev || !dom) return 'in'
  const { width, height } = dom.getBoundingClientRect()
  const { offsetX, offsetY } = ev
  const inWidth = width * 0.7
  const inHeight = height * 0.7
  if (offsetX > (width - inWidth) / 2 && offsetX < width - (width - inWidth) / 2 && offsetY > (height - inHeight) / 2 && offsetY < height - (height - inHeight) / 2) {
    return 'in'
  } else if (offsetX <= (width - inWidth) / 2) {
    return 'left'
  } else if (offsetX >= width - (width - inWidth) / 2) {
    return 'right'
  } else if (offsetY <= (height - inHeight) / 2) {
    return 'top'
  } else if (offsetY >= height - (height - inHeight) / 2) {
    return 'bottom'
  }

  return 'left'
}

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
    const dragoverTarget: DragoverTarget = {
      nodeId: target.id,
      acceptType: 'accept',
      atPosition: getAtPosition(nativeEvent, this.designer.documentModel?.getNodeDom(target.id)),
    }
    this.designer.documentModel?.setDragoverTarget(dragoverTarget)
  }

  handleDragEnd = () => {
    const draggingTarget = this.designer.documentModel?.getDragingTarget()
    const dragoverTarget = this.designer.documentModel?.getDragoverTarget()
    if (draggingTarget && dragoverTarget?.acceptType === 'accept') {
      this.designer.documentModel?.appendChild(
        draggingTarget,
        dragoverTarget.nodeId,
      )
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
