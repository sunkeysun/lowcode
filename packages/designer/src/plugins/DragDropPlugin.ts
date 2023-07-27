/**
 * 拖拽控制器
 */
import { Designer } from '..';
import { Plugin } from './Plugin';
import { DragStartEvent, DragEndEvent, DragOverEvent, DragLeaveEvent, DropEvent } from '../shell/events/types';

export class DragDropPlugin extends Plugin {
  constructor(private readonly designer: Designer) {
    super()
    this.designer.shell.subscribeEvent(DragStartEvent, this.handleDragStart)
    this.designer.shell.subscribeEvent(DragEndEvent, this.handleDragEnd)
    this.designer.shell.subscribeEvent(DragOverEvent, this.handleDragOver)
    this.designer.shell.subscribeEvent(DragLeaveEvent, this.handleDragLeave)
    this.designer.shell.subscribeEvent(DropEvent, this.handleDrop)
  }

  handleDragStart = (event: DragStartEvent) => {
    const { eventData: { lcTarget } } = event
    console.log('start', event)
    let dragNode = null
    if (lcTarget.type === 'component') {
      dragNode = this.designer.documentModel?.createNode(lcTarget.id)
    } else {
      dragNode = this.designer.documentModel?.getNodeById(lcTarget.id)()
    }

    if (dragNode) {
      this.designer.documentModel?.setDraggingTarget(dragNode)
    }
  }

  handleDragOver = (event: DragOverEvent) => {
    const { eventData: { lcTarget } } = event
    this.designer.documentModel?.setDragoverTarget({ target: lcTarget })
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
      this.designer.documentModel?.appendChild(draggingTarget, dragoverTarget.target.id) 
    }
  }

  destroy() {
    //
  }
}
