/**
 * dragover event
 */
export class DragOverEvent extends Event {
  constructor(e: Event) {
    super('custom:dragover', e)
  }
}
