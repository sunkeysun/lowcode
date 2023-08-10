import { Shell } from '..'
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

  constructor(iframeElement: HTMLIFrameElement, shell: Shell) {
    this.#drivers.push(
      new DragDropDriver(iframeElement, shell.dispatchEvent),
      new DragoverDriver(iframeElement, shell.dispatchEvent),
      new MouseoverDriver(iframeElement, shell.dispatchEvent),
      new MouseclickDriver(iframeElement, shell.dispatchEvent),
      new CanvasMutateDriver(iframeElement, shell.dispatchEvent),
    )
  }

  destroy() {
    this.#drivers.forEach((driver) => driver.destroy())
  }
}
