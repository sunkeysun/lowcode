/**
 * mouseover
 */

import { EngineEvent } from './EngineEvent';

export interface MouseoverEventData {
  nativeEvent: MouseEvent
  target: {
    id: string
    type: 'component' | 'node'
  },
}

export class MouseoverEvent extends EngineEvent<MouseoverEventData> {
  static eventName = 'engine:mouseover'
}
