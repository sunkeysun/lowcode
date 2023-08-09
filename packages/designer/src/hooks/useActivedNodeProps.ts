import { useActivedNode } from './useActivedNode'
import { useDesigner } from './useDesigner'

export function useActivedNodeProps() {
  const { designer } = useDesigner()
  const { activedNode } = useActivedNode()

  if (!activedNode) return {}
  const schema = designer?.material.getComponentPropsSchema(
    activedNode?.componentName,
  )
  const onChange = (val: unknown) => {
    designer?.document?.updateNodeProps({
      id: activedNode.id,
      changes: val,
    })
  }

  return { schema, props: activedNode.props, onChange }
}
