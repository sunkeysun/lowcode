/**
 * dragover事件驱动
 */
import { EventDriver } from './EventDriver'
import { DragLeaveEvent, DragOverEvent, DropEvent, type EngineEvent } from '../types'

export class DragOverDriver extends EventDriver {
  element: HTMLElement
  eventData: {
    clientX: number
    clientY: number
  } | null = null

  constructor(
    elem: HTMLElement | Document,
    private dispatchEvent: (event: EngineEvent) => void,
  ) {
    super()
    this.element = elem as HTMLElement
    this.element.addEventListener('dragover', this.handleDragOver)
    this.element.addEventListener('drop', this.handleDrop)
  }

  handleDragOver = (event: DragEvent) => {
    event.preventDefault()
    if (this.eventData
      && this.eventData.clientX === event.clientX
      && this.eventData.clientY === event.clientY) {
      return;
    }
    this.eventData = {
      clientX: event.clientX,
      clientY: event.clientY,
    }
    const lcTarget = this.getNearestLCElement(event.target as HTMLElement)
    if (!lcTarget) {
      return this.dispatchEvent(new DragLeaveEvent())
    }
    this.dispatchEvent(new DragOverEvent({ nativeEvent: event, lcTarget }))
  }

  handleDragLeave = (event: DragEvent) => {
    console.log('leave', event)
    return this.dispatchEvent(new DragLeaveEvent())
  }

  handleDrop = (event: DragEvent) => {
    const lcTarget = this.getNearestLCElement(event.target as HTMLElement)
    if (!lcTarget) return
    this.dispatchEvent(new DropEvent({ nativeEvent: event, lcTarget }))
  }

  destroy() {
    this.element.removeEventListener('dragover', this.handleDragOver)
  }
}
