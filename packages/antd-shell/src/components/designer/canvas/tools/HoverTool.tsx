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
        border: '1px dashed #197aff',
        backgroundColor: 'rgba(0,121,242,.04)',
        pointerEvents: 'none',
        boxSizing: 'border-box',
      }}
    >
    </div>
  )
}
