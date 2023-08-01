/**
 * mouseover
 */

import { type LCTarget } from '../../types';
import { EngineEvent } from './EngineEvent';

export interface MouseoverEventData {
  nativeEvent: MouseEvent
  target: LCTarget
}

export class MouseoverEvent extends EngineEvent<MouseoverEventData> {
  static eventName = 'engine:mouseover'
}
