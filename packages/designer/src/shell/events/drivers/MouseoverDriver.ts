import { EventDriver } from '.'
import { type EngineEvent } from '../types/EngineEvent'
import { MouseoverEvent } from '../types/MouseoverEvent'

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
    const lcTarget = this.getNearestLCElement(ev.target as HTMLElement)
    if (!lcTarget) return
    this.dispatchEvent(new MouseoverEvent({ nativeEvent: ev, lcTarget }))
  }
}
