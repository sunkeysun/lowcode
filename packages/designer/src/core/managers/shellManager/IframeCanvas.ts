import { ShellManager } from '.'
import {
  type EventDriver,
  DragDropDriver,
  DragoverDriver,
  MouseoverDriver,
  MouseclickDriver,
  CanvasMutateDriver,
} from '../../../shell'

export class IframeCanvas {
  #drivers: EventDriver[] = []

  constructor(iframeElement: HTMLIFrameElement, shellManager: ShellManager) {
    this.#drivers.push(
      new DragDropDriver(iframeElement, shellManager.dispatchEvent),
      new DragoverDriver(iframeElement, shellManager.dispatchEvent),
      new MouseoverDriver(iframeElement, shellManager.dispatchEvent),
      new MouseclickDriver(iframeElement, shellManager.dispatchEvent),
      new CanvasMutateDriver(iframeElement, shellManager.dispatchEvent)
    )
  }

  destroy() {
    this.#drivers.forEach((driver) => driver.destroy())
  }
}
