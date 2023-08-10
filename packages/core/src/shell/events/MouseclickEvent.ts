/**
 * mouseleave
 */

import type { LCTarget } from '../../types';
import { EngineEvent } from './EngineEvent';

export interface MouseclickEventData {
  nativeEvent: MouseEvent
  target: LCTarget
}

export class MouseclickEvent extends EngineEvent<MouseclickEventData> {
  static eventName = 'engine:mouseclick'
}
