import { Shell } from './'
import { type EventDriver, DragDropDriver } from '../../shell'

export class Workbench {
  #drivers: EventDriver[] = []

  constructor(container: HTMLElement, shell: Shell) {
    this.#drivers.push(
      new DragDropDriver(container, shell.dispatchEvent),
    )
  }

  destroy() {
    this.#drivers.forEach((driver) => driver.destroy())
  }
}
