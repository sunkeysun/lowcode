import { useCanvasState } from '../../../hooks/useCanvasState'
import { ActivedTool } from './ActivedTool'
import { DragoverTool } from './DragoverTool'
import { HoverTool } from './HoverTool'

export function CanvasTools() {
  const { canvasState } = useCanvasState()
  if (!canvasState) return null

  return (
    <div
      id="iframeMask"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <ActivedTool />
      <HoverTool />
      <DragoverTool />
    </div>
  )
}
