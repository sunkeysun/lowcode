import { useNodeComponent } from '../hooks/useNodeComponent'
import { useMaterialComponent } from '../hooks/useMaterialComponent'
import { JSSlot, Props } from '../types'

export function ComponentRender({ nodeId }: { nodeId: string }) {
  const { ref, node } = useNodeComponent(nodeId)
  const { Component } = useMaterialComponent(node?.componentName as string)
  if (!node || !Component) return null
  const realProps: Props = {}
  Object.entries(node.props).forEach(([key, val]) => {
    const slotVal = val as JSSlot
    if (slotVal?.type === 'JSSlot' && slotVal.id) {
      realProps[key] = <ComponentRender nodeId={slotVal.id} />
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
