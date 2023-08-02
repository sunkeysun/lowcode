import { useDragNode } from '../hooks/useDragNode'
import { useNode } from '../hooks/useNode'
import { useComponent } from '../hooks/useComponent'

export function ComponentRender({ nodeId }: { nodeId: string }) {
  const { node } = useNode(nodeId)
  const { ref } = useDragNode(nodeId)
  const { Component } = useComponent(node?.componentName as string)
  if (!node || !Component) return null

  return (
    <Component {...node.props} ref={ref}>
      {node.childrenIds?.map?.((nodeId, index) => (
        <ComponentRender nodeId={nodeId} key={index} />
      ))}
    </Component>
  )
}
