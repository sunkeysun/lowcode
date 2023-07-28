/**
 * dragover event
 */
import { EngineEvent } from './EngineEvent'

export interface DragOverEventData {
  nativeEvent: MouseEvent
  target: {
    id: string
    type: 'component' | 'node'
  },
}
export class DragOverEvent extends EngineEvent<DragOverEventData> {
  static eventName = 'engine:dragover'
}
