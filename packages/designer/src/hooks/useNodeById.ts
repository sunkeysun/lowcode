import { useSelector } from 'react-redux';
import { useDesigner } from './useDesigner';

export function useNodeById(nodeId: string) {
  const { designer } = useDesigner()
  const node = useSelector(designer!.documentModel!.getNodeById(nodeId))
  return { node }
}
