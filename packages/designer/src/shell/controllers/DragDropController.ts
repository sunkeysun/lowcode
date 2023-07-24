/**
 * 拖拽控制器
 */
import { Shell } from '..';
import { DragStartEvent, DragEndEvent, DragOverEvent, DragLeaveEvent, DropEvent } from '../events/types';
import { store, documentUI } from '../../store';

export class DragDropController {
  constructor(private readonly shell: Shell) {
    this.shell.subscribeEvent(DragStartEvent, this.handleDragStart)
    this.shell.subscribeEvent(DragEndEvent, this.handleDragEnd)
    this.shell.subscribeEvent(DragOverEvent, this.handleDragOver)
    this.shell.subscribeEvent(DragLeaveEvent, this.handleDragLeave)
    this.shell.subscribeEvent(DropEvent, this.handleDrop)
  }

  handleDragStart = (e: DragStartEvent) => {
    const { eventData: { lcTarget, nativeEvent } } = e
    let rect = { top: 0, left: 0, width: 0, height: 0 }
    if (lcTarget.type === 'node') {
      rect = {}
    }
    store.dispatch(documentUI.actions.chnageDraggingElement({
      target: lcTarget,
      rect,
    }))
  }

  handleDragOver = (e: DragOverEvent) => {
    console.log(e, Date.now())
    const { eventData } = e
    store.dispatch(documentUI.actions.chnageDraggingElement({
      target: eventData.lcTarget,
      rect: {
        top: 100,
        left: 100,
        width: 100,
        height: 100,
      }
    }))
  }

  handleDragEnd = () => {
    store.dispatch(documentUI.actions.chnageDraggingElement(null))
  }

  handleDragLeave = () => {
    store.dispatch(documentUI.actions.chnageDraggingElement(null))
  }

  handleDrop = (e: DropEvent) => {
    console.log(e)
    //
  }
}
