import { useHoverTarget } from '@lowcode/core'

export function HoverTool() {
  const { hoverTarget, domRect } = useHoverTarget()

  if (!domRect || !hoverTarget) return null

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
