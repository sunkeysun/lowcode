import { useNodeComponent } from '../hooks/useNodeComponent'
import { useMaterialComponent } from '../hooks/useMaterialComponent'

export function ComponentRender({ nodeId }: { nodeId: string }) {
  const { ref, node } = useNodeComponent(nodeId)
  const { Component } = useMaterialComponent(node?.componentName as string)
  if (!node || !Component) return null

  return (
    <Component {...node.props} ref={ref}>
      {node.childIds?.map?.((nodeId, index) => (
        <ComponentRender nodeId={nodeId} key={index} />
      ))}
    </Component>
  )
}
