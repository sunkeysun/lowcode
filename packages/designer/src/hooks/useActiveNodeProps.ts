import { useActiveNode } from './useActiveNode'
import { useDesigner } from './useDesigner'

export function useActiveNodeProps() {
  const { designer } = useDesigner()
  const { activeNode } = useActiveNode()

  if (!activeNode) return {}
  const schema = designer?.material.getPropsSchemaByName(
    activeNode?.componentName,
  )
  const onChange = (val: Record<string, unknown>) => {
    designer?.document?.updateNodeProps({
      id: activeNode.id,
      changes: val,
    })
  }

  return { schema, props: activeNode.props, onChange }
}
