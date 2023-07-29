/**
 * 画布尺寸改变
 */
import { EngineEvent } from './EngineEvent';

export interface CanvasMutateEventData {
  scrollTop: number
  domRect: {
    top: number
    left: number
    width: number
    height: number
  }
}

export class CanvasMutateEvent extends EngineEvent<CanvasMutateEventData> {
  static eventName: 'engine:canvas-resize'
}
