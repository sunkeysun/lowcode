/**
 * drag drop事件驱动
 */
import { LC_ELEMENT } from '../../../common/constants'
import { EventDriver } from './EventDriver'

export class DragDropDriver extends EventDriver {
  element: HTMLElement

  constructor(
    elem: HTMLElement | Document,
    private dispatch: (name: string, d: any) => void,
  ) {
    super()
    this.element = elem as HTMLElement
    this.element.addEventListener('dragstart', this.handleDragStart)
    this.element.addEventListener('dragend', this.handleDragEnd)
  }

  handleDragStart = (e: DragEvent) => {
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
    this.dispatch('custom:dragstart', event)
  }

  handleDragEnd = (e: DragEvent) => {
    this.dispatch('custom:dragend', e)
  }

  destroy() {
    this.element.removeEventListener('dragstart', this.handleDragStart)
    this.element.removeEventListener('dragend', this.handleDragEnd)
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
