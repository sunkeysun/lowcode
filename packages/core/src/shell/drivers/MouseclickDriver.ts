import { EventDriver } from '.'
import { type EngineEvent, MouseclickEvent } from '../events'

export class MouseclickDriver extends EventDriver {
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
    this.element.addEventListener('click', this.handleClick)
  }

  handleClick = (ev: MouseEvent) => {
    const target = this.getNearestLCTarget(ev.target as HTMLElement)
    if (!target) return
    this.dispatchEvent(new MouseclickEvent({ nativeEvent: ev, target }))
  }
}
