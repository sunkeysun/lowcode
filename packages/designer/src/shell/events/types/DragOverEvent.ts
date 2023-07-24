/**
 * dragover event
 */
import { EngineEvent } from './EngineEvent'

export interface DragOverEventData {
  nativeEvent: MouseEvent
  lcTarget: {
    id: string
    type: 'component' | 'node'
  },
}
export class DragOverEvent extends EngineEvent<DragOverEventData> {
  static eventName = 'engine:dragover'
}
