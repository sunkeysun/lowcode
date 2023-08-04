import { useActivedNode } from './useActivedNode'
import { useDesigner } from './useDesigner'

export function useActivedNodeProps() {
  const { designer } = useDesigner()
  const { activedNode } = useActivedNode()

  if (!activedNode) return {}
  const schema = designer?.materialManager.getComponentPropsSchema(
    activedNode?.componentName,
  )
  const onChange = (key: string, val: unknown) => {
    designer?.documentModel?.updateNodeProps({
      id: activedNode.id,
      changes: { [key]: val },
    })
  }

  return { schema, props: activedNode.props, onChange }
}
