/**
 * 拖拽控制器
 */
import { Designer } from '..'
import { Plugin } from './Plugin'
import {
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  DragLeaveEvent,
  DropEvent,
} from '../shell'

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
      this.designer.shellManager.subscribeEvent(DropEvent, this.handleDrop),
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
      dragNode = this.designer.documentModel?.getNodeById(target.id)
    }

    if (dragNode) {
      this.designer.documentModel?.setDraggingTarget(dragNode)
    }
  }

  handleDragOver = (event: DragOverEvent) => {
    const {
      eventData: { target },
    } = event
    this.designer.documentModel?.setDragoverTarget({ target })
  }

  handleDragEnd = () => {
    this.designer.documentModel?.setDraggingTarget(null)
    this.designer.documentModel?.setDragoverTarget(null)
  }

  handleDragLeave = () => {
    this.designer.documentModel?.setDragoverTarget(null)
  }

  handleDrop = () => {
    const draggingTarget = this.designer.documentModel?.getDragingTarget()
    const dragoverTarget = this.designer.documentModel?.getDragOverTarget()
    if (draggingTarget && dragoverTarget) {
      this.designer.documentModel?.appendChild(
        draggingTarget,
        dragoverTarget.target.id,
      )
    }
  }

  destroy() {
    this.#unsubscribers.forEach((uninstall) => uninstall())
    this.#unsubscribers = []
  }
}
