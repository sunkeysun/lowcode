import { type Designer } from '..';
import { MouseoverEvent } from '../shell/events/types/MouseoverEvent';
import { Plugin } from './Plugin';

export class HoverPlugin extends Plugin {
  constructor(private readonly designer: Designer) {
    super()
    this.designer.shell.subscribeEvent(MouseoverEvent, this.handleMouseover)
  }

  handleMouseover = (ev: MouseoverEvent) => {
    const { eventData: { lcTarget } } = ev
    if (lcTarget.type !== 'node') return
    this.designer.documentModel?.setHoverTarget(lcTarget)
  }
}
