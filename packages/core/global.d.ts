import { Designer } from './src'
import { type LCTarget } from './src/types'

declare global {
  interface HTMLElement {
    __LC_TARGET: LCTarget
  }

  interface Window {
    __LC_DESIGNER: Designer
  }
}
