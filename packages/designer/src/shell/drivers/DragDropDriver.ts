/**
 * drag drop事件驱动
 */
import { DragEndEvent, DragStartEvent, type EngineEvent } from '../events'
import { EventDriver } from './EventDriver'

export class DragDropDriver extends EventDriver {
  element: HTMLElement

  constructor(
    elem: HTMLElement | Document,
    private dispatchEvent: (event: EngineEvent) => void,
  ) {
    super()
    this.element = elem as HTMLElement
    this.element.addEventListener('dragstart', this.handleDragStart)
    this.element.addEventListener('dragend', this.handleDragEnd)
  }

  handleDragStart = (event: DragEvent) => {
    const target = this.getNearestLCTarget(event.target as HTMLElement)
    if (!target) return
    this.dispatchEvent(new DragStartEvent({ nativeEvent: event, target }))
  }

  handleDragEnd = () => {
    this.dispatchEvent(new DragEndEvent())
  }

  destroy() {
    this.element.removeEventListener('dragstart', this.handleDragStart)
    this.element.removeEventListener('dragend', this.handleDragEnd)
  }
}
