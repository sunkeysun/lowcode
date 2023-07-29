/**
 * 悬停插件
 */
import { type Designer } from '..'
import { CanvasMutateEvent } from '../shell'
import { Plugin } from './Plugin'

export class CanvasMutatePlugin extends Plugin {
  #unsubscribers: Array<() => void> = []
  constructor(private readonly designer: Designer) {
    super()
    this.#unsubscribers.push(
      this.designer.shellManager.subscribeEvent(
        CanvasMutateEvent,
        this.handleCanvasMutate,
      ),
    )
  }

  handleCanvasMutate = (ev: CanvasMutateEvent) => {
    // this.designer.documentModel?.setHoverTarget({ target })
  }

  destroy() {
    this.#unsubscribers.forEach((unsubscribe) => unsubscribe())
    this.#unsubscribers = []
  }
}
