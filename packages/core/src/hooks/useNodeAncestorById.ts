import { useSelector } from 'react-redux'
import { useDesigner } from './useDesigner'

export function useNodeAncestorById(nodeId: string) {
  const { designer } = useDesigner()
  const nodeAncestor = useSelector(() =>
    designer!.document!.getNodeAncestorById(nodeId),
  )
  return { nodeAncestor }
}
