import { useHoverNode } from '../../../hooks/useHoverNode'

export function HoverTool() {
  const { hoverNode, domRect } = useHoverNode()

  if (!domRect || !hoverNode) return null

  return (
    <div
      style={{
        position: 'absolute',
        top: domRect.top,
        left: domRect.left,
        width: domRect.width,
        height: domRect.height,
        border: '1px dashed red',
        pointerEvents: 'none',
        boxSizing: 'border-box',
      }}
    >
    </div>
  )
}
