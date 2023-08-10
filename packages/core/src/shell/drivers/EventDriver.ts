import { LC_TARGET } from '../../common/constants'
import { type LCTarget } from '../../types'

export class EventDriver {
  getNearestLCTarget(elem: HTMLElement | null): LCTarget | null {
    if (!elem || elem === document.body) {
      return null
    }
    if (elem[LC_TARGET]) {
      return elem[LC_TARGET]
    } else {
      return this.getNearestLCTarget(elem.parentElement)
    }
  }

  destroy() {
    // empty
  }
}
