import { ShellManager } from '.'
import { type EventDriver, DragDropDriver, DragoverDriver } from '../../../shell'

export class IframeCanvas {
  #drivers: EventDriver[] = []

  constructor(contentDocument: Document, shellManager: ShellManager) {
    this.#drivers.push(
      new DragDropDriver(contentDocument, shellManager.dispatchEvent),
      new DragoverDriver(contentDocument, shellManager.dispatchEvent),
    )
  }

  destroy() {
    this.#drivers.forEach((driver) => driver.destroy())
  }
}
