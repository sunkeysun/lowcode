/**
 * dragstart event
 */
import { EngineEvent } from './EngineEvent'

export interface DragStartEventData {
  nativeEvent: MouseEvent
  lcTarget: {
    id: string
    type: 'component' | 'node'
  },
}

export class DragStartEvent extends EngineEvent<DragStartEventData> {
  static eventName = 'engine:dragstart'
}
