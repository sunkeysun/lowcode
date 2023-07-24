import { LC_TARGET } from '../../../common/constants'

export interface LCElement {
  id: string
  type: 'component' | 'node'
}
export class EventDriver {
  getNearestLCElement(elem: HTMLElement | null): LCElement | null {
    if (!elem || elem === document.body) {
      return null
    }
    if (elem[LC_TARGET]) {
      return elem[LC_TARGET]
    } else {
      return this.getNearestLCElement(elem.parentElement)
    }
  }

  destroy() {
    // empty
  }
}
