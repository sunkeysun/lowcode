import { EventDriver } from '../events/drivers'

export class Workbench {
  constructor(
    private readonly eventDrivers: EventDriver[],
  ) {}

  destroy() {
    this.eventDrivers.forEach((driver) => driver.destroy())
  }
}
