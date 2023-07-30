import { useSelector } from 'react-redux'
import { useDesigner } from './useDesigner'

export function useNodeParents(nodeId: string) {
  const { designer } = useDesigner()
  const nodeParents = useSelector(() => designer!.documentModel!.getNodeParents(nodeId))
  return { nodeParents }
}
