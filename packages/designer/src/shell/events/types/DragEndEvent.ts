/**
 * dragend event
 */
export class DragEndEvent extends Event {
  constructor(e: Event) {
    super('custom:dragend', e)
  }
}
