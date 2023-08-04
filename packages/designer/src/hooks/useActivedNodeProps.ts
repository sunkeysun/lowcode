import { useActivedNode } from './useActivedNode'
import { useDesigner } from './useDesigner'

export function useActivedNodeProps() {
  const { designer } = useDesigner()
  const { activedNode } = useActivedNode()

  if (!activedNode)
    return {}
  const schema = designer?.materialManager.getComponentPropsSchema(
    activedNode?.componentName,
  )
  return { schema }
}
