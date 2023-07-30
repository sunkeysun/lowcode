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
    const { eventData } = ev
    if (!eventData) return
    this.designer.documentModel?.setCanvasState(eventData)
  }

  destroy() {
    this.#unsubscribers.forEach((unsubscribe) => unsubscribe())
    this.#unsubscribers = []
  }
}
