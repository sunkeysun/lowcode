import { useSelector } from 'react-redux'
import { useDragNode } from '../hooks/useDragNode'
import * as components from '../materials/test'
import { RootState, nodeEntity } from '../store'

export function ComponentRender({ nodeId }) {
  const node = useSelector((state: RootState) =>
    nodeEntity.selectors.selectById(state, nodeId as string),
  )
  const Component = components[node.componentName]
  const { ref } = useDragNode(node.id)
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
