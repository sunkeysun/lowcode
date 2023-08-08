import { useNodeComponent } from '../hooks/useNodeComponent'
import { useMaterialComponent } from '../hooks/useMaterialComponent'
import { NodeSchema, Props } from '../types'

export function ComponentRender({ nodeId }: { nodeId: string }) {
  const { ref, node } = useNodeComponent(nodeId)
  const { Component } = useMaterialComponent(node?.componentName as string)
  if (!node || !Component) return null
  const realProps: Props = {}
  Object.entries(node.props).forEach(([key, val]) => {
    const slotVal = val as { type: 'JSSlot'; value: NodeSchema[] }
    if (slotVal?.type === 'JSSlot') {
      realProps[key] = !slotVal.value?.length ? (
        <div style={{ width: 20, height: 20, backgroundColor: 'red' }} />
      ) : (
        <ComponentRender nodeId="" />
      )
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
