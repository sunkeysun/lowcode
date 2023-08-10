import { useActiveNode, useMaterialBehaviorByName } from '@lowcode/core'

export function ActiveTool() {
  const { activeNode, domRect, removeActiveNode } = useActiveNode()
  const { behavior } = useMaterialBehaviorByName(
    activeNode?.componentName as string,
  )

  if (!domRect || !activeNode) return null

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
        {behavior?.canRemove() && (
          <button
            onClick={() => removeActiveNode()}
            style={{ fontSize: 10, padding: 0, pointerEvents: 'initial' }}
          >
            x
          </button>
        )}
      </div>
    </div>
  )
}
