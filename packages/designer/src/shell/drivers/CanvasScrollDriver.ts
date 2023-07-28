/**
 * 画布事件驱动
 */
import { CanvasScrollEvent, type EngineEvent } from '../events'
import { EventDriver } from './EventDriver'

export class CanvasResizeDriver extends EventDriver {
  element: HTMLElement

  constructor(
    elem: HTMLElement | Document,
    private dispatchEvent: (event: EngineEvent) => void,
  ) {
    super()
    this.element = elem as HTMLElement
    this.element.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = (e: Event) => {
    const htmlTarget = e.target as HTMLElement
    const documentTarget = e.target as Document
    let scrollTop = 0
    if (documentTarget?.documentElement?.scrollTop ?? -1 >= 0) {
      scrollTop = documentTarget?.documentElement?.scrollTop
    } else {
      scrollTop = htmlTarget.scrollTop
    }
    const event = new CanvasScrollEvent({ scrollTop })
    this.dispatchEvent(event)
  }

  destroy() {
    this.element.removeEventListener('scroll', this.handleScroll)
  }
}
