import { Designer, LCTarget } from '@lowcode/core'

declare global {
  interface HTMLElement {
    __LC_TARGET: LCTarget
  }

  interface Window {
    __LC_DESIGNER: Designer
  }
}
