/**
 * 画布尺寸改变
 */
import { EngineEvent } from './EngineEvent';
export class CanvasResizeEvent extends EngineEvent{
  static eventName: 'engine:canvas-resize'
}
