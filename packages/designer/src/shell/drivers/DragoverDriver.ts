/**
 * dragover事件驱动
 */
import { EventDriver } from './EventDriver'
import { DragLeaveEvent, DragOverEvent, type EngineEvent } from '../events'

export class DragoverDriver extends EventDriver {
  element: HTMLElement
  eventData: {
    clientX: number
    clientY: number
  } | null = null

  constructor(
    elem: HTMLElement,
    private dispatchEvent: (event: EngineEvent) => void,
  ) {
    super()
    this.element = ((elem as HTMLIFrameElement)?.contentDocument ?? elem) as HTMLElement
    this.element.addEventListener('dragover', this.handleDragOver)
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
    const target = this.getNearestLCTarget(event.target as HTMLElement)
    if (!target) {
      return this.dispatchEvent(new DragLeaveEvent())
    }
    this.dispatchEvent(new DragOverEvent({ nativeEvent: event, target }))
  }

  handleDragLeave = () => {
    return this.dispatchEvent(new DragLeaveEvent())
  }

  destroy() {
    this.element.removeEventListener('dragover', this.handleDragOver)
  }
}
