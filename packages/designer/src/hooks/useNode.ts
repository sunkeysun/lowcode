import { useSelector } from 'react-redux';
import { useDesigner } from './useDesigner';

export function useNode(nodeId: string) {
  const { designer } = useDesigner()
  const node = useSelector(() => designer!.document!.getNode(nodeId))
  return { node }
}
