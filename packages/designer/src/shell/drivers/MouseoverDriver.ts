import { EventDriver } from '.'
import { type EngineEvent, MouseoverEvent } from '../events'

export class MouseoverDriver extends EventDriver {
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
    this.element.addEventListener('mouseover', this.handleMouseover)
  }

  handleMouseover = (ev: MouseEvent) => {
    const target = this.getNearestLCTarget(ev.target as HTMLElement)
    if (!target) return
    this.dispatchEvent(new MouseoverEvent({ nativeEvent: ev, target }))
  }
}
