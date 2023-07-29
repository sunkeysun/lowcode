/**
 * mouseleave
 */

import { EngineEvent } from './EngineEvent';

export interface MouseclickEventData {
  nativeEvent: MouseEvent
  target: {
    id: string
    type: 'component' | 'node'
  },
}

export class MouseclickEvent extends EngineEvent<MouseclickEventData> {
  static eventName = 'engine:mouseclick'
}
