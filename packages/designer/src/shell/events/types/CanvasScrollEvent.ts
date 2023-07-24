/**
 * 画布滚动事件
 */
import { EngineEvent } from './EngineEvent';

interface CanvasScrollEventData {
  scrollTop: number
}
export class CanvasScrollEvent extends EngineEvent<CanvasScrollEventData>{
  static eventName: 'engine:canvas-scroll'
}
