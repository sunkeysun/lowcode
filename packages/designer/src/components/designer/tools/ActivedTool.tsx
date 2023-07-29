import { useActivedNode } from '../../../hooks/useActivedNode'

export function ActivedTool() {
  const { activedNode, domRect } = useActivedNode()

  if (!domRect || !activedNode) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: domRect.top,
        left: domRect.left,
        width: domRect.width,
        height: domRect.height,
        border: '1px solid blue',
        pointerEvents: 'none',
      }}
    >
      {activedNode.id}
    </div>
  )
}
