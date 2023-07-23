/**
 * 画布尺寸改变
 */
export const CanvasResizeEventType = 'custom:canvasResize'
export class CanvasResizeEvent extends CustomEvent<{x: number}> {
  constructor() {
    super(CanvasResizeEventType, { detail: { x: 1 } })
  }
}
