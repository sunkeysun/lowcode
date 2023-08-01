import { useDesigner } from '../hooks/useDesigner'
import { useDragNode } from '../hooks/useDragNode'
import { useNode } from '../hooks/useNode'
import * as components from '../materials/test'

export function ComponentRender({ nodeId }: { nodeId: string }) {
  const { node } = useNode(nodeId)
  const { ref } = useDragNode(nodeId)
  const { designer } = useDesigner()
  const componentMap = designer?.materialManager.componentMap
  if (!node || !componentMap) return null
  const componentName = node.componentName.split('-')[0] as keyof typeof components
  const Component = componentMap[componentName] as () => React.ReactNode
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
