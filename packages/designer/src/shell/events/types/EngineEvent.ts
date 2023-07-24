export abstract class EngineEvent<T = unknown> {
  static eventName: string
  eventData: T
  constructor(eventData?: T) {
    this.eventData = eventData as T
  }
}
