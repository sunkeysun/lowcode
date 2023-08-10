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
      this.designer.shell.subscribeEvent(
        CanvasMutateEvent,
        this.handleCanvasMutate,
      ),
    )
  }

  handleCanvasMutate = (ev: CanvasMutateEvent) => {
    const { eventData } = ev
    if (!eventData) return
    const canvasState = this.designer.document?.canvasState
    if (
      canvasState &&
      JSON.stringify(canvasState) === JSON.stringify(eventData)
    ) {
      return
    }

    this.designer.document?.setCanvasState(eventData)
  }

  destroy() {
    this.#unsubscribers.forEach((unsubscribe) => unsubscribe())
    this.#unsubscribers = []
  }
}
