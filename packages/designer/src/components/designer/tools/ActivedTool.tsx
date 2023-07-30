import { useActivedNode } from '../../../hooks/useActivedNode'

export function ActivedTool() {
  const { activedNode, domRect } = useActivedNode()

  if (!domRect || !activedNode) return null

  return (
    <div
      style={{
        position: 'absolute',
        top: domRect.top,
        left: domRect.left,
        width: domRect.width,
        height: domRect.height,
        border: '1px solid blue',
        pointerEvents: 'none',
      }}
    >
      <div style={{
        position: 'absolute',
        top: -20,
        left: 0,
        pointerEvents: 'initial',
        width: 100,
      }}>
        <button onClick={() => console.log('选择组件树')} style={{ fontSize: 10, padding: 0 }}>组件树</button>
      </div>
    </div>
  )
}
