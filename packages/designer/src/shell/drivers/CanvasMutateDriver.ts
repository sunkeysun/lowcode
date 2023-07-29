/**
 * 画布事件驱动
 */
import { CanvasMutateEvent, type EngineEvent } from '../events'
import { EventDriver } from './EventDriver'

export class CanvasMutateDriver extends EventDriver {
  contentDocument: Document | null
  contentWindow: Window | null

  constructor(
    private readonly iframe: HTMLIFrameElement,
    private dispatchEvent: (event: EngineEvent) => void,
  ) {
    super()
    this.contentDocument = iframe.contentDocument
    this.contentWindow = iframe.contentWindow
    this.contentDocument?.addEventListener('scroll', this.handleMutate)
    this.contentWindow?.addEventListener('resize', this.handleMutate)
  }

  handleMutate = () => {
    const scrollTop = this.contentDocument?.documentElement.scrollTop ?? 0
    const domRect = this.iframe.getBoundingClientRect()
    this.dispatchEvent(new CanvasMutateEvent({
      scrollTop,
      domRect: {
        top: domRect.top,
        left: domRect.left,
        width: domRect.width,
        height: domRect.height,
      },
    }))
  }

  handleScroll = (evt: Event) => {
    const htmlTarget = evt.target as HTMLElement
    const documentTarget = evt.target as Document
    let scrollTop = 0
    if (documentTarget?.documentElement?.scrollTop ?? -1 >= 0) {
      scrollTop = documentTarget?.documentElement?.scrollTop
    } else {
      scrollTop = htmlTarget.scrollTop
    }
    this.dispatchEvent(new CanvasScrollEvent({ scrollTop }))
  }

  destroy() {
    this.contentDocument?.removeEventListener('scroll', this.handleScroll)
    this.contentWindow?.removeEventListener('resize', this.handleResize)
  }
}
