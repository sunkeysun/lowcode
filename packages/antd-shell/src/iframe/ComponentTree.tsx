import {
  useRootNode,
  useLCNodeById,
  useMaterialComponentByName,
  JSSlot,
  Props,
  useReady,
} from '@lowcode/core'

function ComponentRender({ nodeId }: { nodeId: string }) {
  const { ref, node } = useLCNodeById(nodeId)
  const { Component } = useMaterialComponentByName(
    node?.componentName as string,
  )
  if (!node || !Component) return null
  const realProps: Props = {}
  Object.entries(node.props).forEach(([key, val]) => {
    const slotVal = val as JSSlot
    if (slotVal?.type === 'JSSlot') {
      realProps[key] =
        slotVal.enabled && slotVal.id ? (
          <ComponentRender nodeId={slotVal.id} />
        ) : null
    } else {
      realProps[key] = val
    }
  })

  return (
    <Component {...realProps} ref={ref}>
      {node.childIds?.map?.((nodeId, index) => (
        <ComponentRender nodeId={nodeId} key={index} />
      ))}
    </Component>
  )
}

export function ComponentTree() {
  const rootNode = useRootNode()
  const { isReady } = useReady()
  if (!rootNode || !isReady) return null
  return <ComponentRender nodeId={rootNode.id} />
}
