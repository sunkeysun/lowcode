/**
 * 画布滚动事件
 */
export class CanvasScrollEvent extends Event {
  constructor(e: Event) {
    super('custom:canvasScroll', e)
  }
}
