import { useDragoverTarget, capitalize } from '@lowcode/core'

export function DragoverTool() {
  const { dragoverTarget, domRect } = useDragoverTarget()

  if (!dragoverTarget || !domRect) return null
  let borderStyle: Record<string, string> = {
    backgroundColor:
      dragoverTarget.acceptStatus === 'accept'
        ? 'rgba(0, 0, 255, 0.3)'
        : 'rgba(255, 0, 0, 0.3)',
  }
  if (dragoverTarget.alignPosition !== 'in') {
    borderStyle = {
      [`border${capitalize(dragoverTarget.alignPosition)}`]: `3px solid ${
        dragoverTarget.acceptStatus === 'accept' ? 'blue' : 'red'
      }`,
    }
  }

  return (
    <div
      style={{
        ...borderStyle,
        position: 'absolute',
        top: domRect.top,
        left: domRect.left,
        width: domRect.width,
        height: domRect.height,
      }}
    />
  )
}
