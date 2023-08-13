/**
 * dragover event
 */
import type { LCTarget } from '../../types'
import { EngineEvent } from './EngineEvent'

export interface DragOverEventData {
  nativeEvent: MouseEvent
  target: LCTarget
}
export class DragOverEvent extends EngineEvent<DragOverEventData> {
  static eventName = 'engine:dragover'
}
