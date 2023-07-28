import { type Designer } from '..'
import { MouseoverEvent } from '../shell'
import { Plugin } from './Plugin'

export class HoverPlugin extends Plugin {
  #unsubscribers: Array<() => void> = []
  constructor(private readonly designer: Designer) {
    super()
    this.#unsubscribers.push(
      this.designer.shellManager.subscribeEvent(
        MouseoverEvent,
        this.handleMouseover,
      ),
    )
  }

  handleMouseover = (ev: MouseoverEvent) => {
    const {
      eventData: { target },
    } = ev
    if (target.type !== 'node') return
    this.designer.documentModel?.setHoverTarget({ target })
  }

  destroy() {
    this.#unsubscribers.forEach((unsubscribe) => unsubscribe())
    this.#unsubscribers = []
  }
}
