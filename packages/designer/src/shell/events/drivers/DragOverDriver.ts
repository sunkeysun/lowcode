/**
 * dragover事件驱动
 */
import { EventDriver } from './EventDriver'
import { LC_ELEMENT } from '../../../common/constants'

export class DragOverDriver extends EventDriver {
  element: HTMLElement
  overEventInfo: {
    offsetX: number
    offsetY: number
    target: HTMLElement
  } | null = null

  constructor(
    elem: HTMLElement | Document,
    private dispatch: (name: string, d: any) => void,
  ) {
    super()
    this.element = elem as HTMLElement
    this.element.addEventListener('dragover', this.handleDragOver)
    this.element.addEventListener('drop', this.handleDrop)
  }

  handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    if (this.overEventInfo
      && this.overEventInfo.offsetX === e.offsetX
      && this.overEventInfo.offsetY === e.offsetY
      && this.overEventInfo.target === e.target) {
      return;
    }
    this.overEventInfo = {
      offsetX: e.offsetX,
      offsetY: e.offsetY,
      target: e.target as HTMLElement,
    }
    const lcElement = this.getNearestLCElement(e.target as HTMLElement)
    if (!lcElement) return

    const { top, left, width, height } = lcElement.getBoundingClientRect()
    const info = lcElement[LC_ELEMENT]
    const event = {
      info,
      rect: {
        top,
        left,
        width,
        height,
      },
    }
    this.dispatch('custom:dragover', event)
  }

  handleDrop = (e: DragEvent) => {
    const lcElement = this.getNearestLCElement(e.target as HTMLElement)
    if (!lcElement) return

    const { top, left, width, height } = lcElement.getBoundingClientRect()
    const info = lcElement[LC_ELEMENT]
    const event = {
      info,
      rect: {
        top,
        left,
        width,
        height,
      },
    }
    this.dispatch('custom:drop', event)
  }

  destroy() {
    this.element.removeEventListener('dragover', this.handleDragOver)
  }

  getNearestLCElement(elem: HTMLElement | null): HTMLElement | null {
    if (!elem || elem === document.body) {
      return null
    }
    if (elem[LC_ELEMENT]) {
      return elem
    } else {
      return this.getNearestLCElement(elem.parentElement)
    }
  }
}
