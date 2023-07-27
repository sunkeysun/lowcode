import { useDragNode } from '../hooks/useDragNode'
import { useNodeById } from '../hooks/useNodeById'
import * as components from '../materials/test'

export function ComponentRender({ nodeId }: { nodeId: string }) {
  const { node } = useNodeById(nodeId)
  const { ref } = useDragNode(nodeId)
  if (!node) return null
  const componentName = node.componentName.split('-')[0] as keyof typeof components
  const Component = components[componentName]
  if (!Component) {
    return '组件不存在'
  }

  return (
    <Component {...node.props} ref={ref}>
      {node.childrenIds?.map?.((nodeId, index) => (
        <ComponentRender nodeId={nodeId} key={index} />
      ))}
    </Component>
  )
  // return <div>组件渲染</div>
}
