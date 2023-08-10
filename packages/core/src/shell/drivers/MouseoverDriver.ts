import { EventDriver } from '.'
import { type EngineEvent, MouseoverEvent, MouseleaveEvent } from '../events'

export class MouseoverDriver extends EventDriver {
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
    this.element.addEventListener('mouseover', this.handleMouseover)
    this.element.addEventListener('mouseleave', this.handleMouseleave)
  }

  handleMouseover = (ev: MouseEvent) => {
    const target = this.getNearestLCTarget(ev.target as HTMLElement)
    if (!target) {
      return this.dispatchEvent(new MouseleaveEvent)
    }
    this.dispatchEvent(new MouseoverEvent({ nativeEvent: ev, target }))
  }

  handleMouseleave = () => {
    this.dispatchEvent(new MouseleaveEvent)
  }
}
