import { useActivedNode } from '../../../hooks/useActivedNode'

export function ActivedTool() {
  const { activedNode, domRect } = useActivedNode()

  if (!domRect || !activedNode) return null

  const { top, left, width, height } = domRect

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        width,
        height,
        border: '1px solid blue',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -20,
          left: 0,
          width: 100,
        }}
      >
        <button
          onClick={() => console.log('选择组件树')}
          style={{ fontSize: 10, padding: 0, pointerEvents: 'initial' }}
        >
          组件树
        </button>
      </div>
    </div>
  )
}
