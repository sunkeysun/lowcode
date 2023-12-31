import { useSelector } from 'react-redux';
import { useDesigner } from './useDesigner';

export function useRootNode() {
  const { designer }  = useDesigner()
  const rootNode = useSelector(() => designer!.document!.rootNode)
  return rootNode
}
