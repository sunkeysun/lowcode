/**
 * drag drop事件驱动
 */
import { DragEndEvent, DragStartEvent, type EngineEvent } from '../events'
import { EventDriver } from './EventDriver'

export class DragDropDriver extends EventDriver {
  element: HTMLElement 

  constructor(
    elem: HTMLElement,
    private dispatchEvent: (event: EngineEvent) => void,
  ) {
    super()
    this.element = ((elem as HTMLIFrameElement)?.contentDocument ?? elem) as HTMLElement
    this.element.addEventListener('dragstart', this.handleDragStart)
    this.element.addEventListener('dragend', this.handleDragEnd)
  }

  handleDragStart = (evt: DragEvent) => {
    const target = this.getNearestLCTarget(evt.target as HTMLElement)
    if (!target) return
    this.dispatchEvent(new DragStartEvent({ nativeEvent: evt, target }))
  }

  handleDragEnd = () => {
    this.dispatchEvent(new DragEndEvent())
  }

  destroy() {
    this.element.removeEventListener('dragstart', this.handleDragStart)
    this.element.removeEventListener('dragend', this.handleDragEnd)
  }
}
