import { Designer } from './src'

declare global {
  interface HTMLElement {
    __LC_TARGET: {
      id: string
      type: 'component' | 'node'
    }
  }

  interface Window {
    __LC_DESIGNER: Designer
  }
}
