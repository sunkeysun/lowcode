import { ShellManager } from '.'
import { type EventDriver, DragDropDriver } from '../../../shell'

export class Workbench {
  #drivers: EventDriver[] = []

  constructor(container: HTMLElement, shellManager: ShellManager) {
    this.#drivers.push(
      new DragDropDriver(container, shellManager.dispatchEvent),
    )
  }

  destroy() {
    this.#drivers.forEach((driver) => driver.destroy())
  }
}
