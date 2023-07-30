import { useCanvasState } from '../../../hooks/useCanvasState'
import { ActivedTool } from './ActivedTool'
import { DragoverTool } from './DragoverTool'
import { HoverTool } from './HoverTool'

export function CanvasTools() {
  const { canvasState } = useCanvasState()
  if (!canvasState) return null
  const { domRect } = canvasState

  return (
    <div
      style={{
        ...domRect,
        position: 'fixed',
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
