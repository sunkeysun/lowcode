/**
 * dragstart event
 */
import { type LCTarget } from '../../types'
import { EngineEvent } from './EngineEvent'

export interface DragStartEventData {
  nativeEvent: MouseEvent
  target: LCTarget
}

export class DragStartEvent extends EngineEvent<DragStartEventData> {
  static eventName = 'engine:dragstart'
}
