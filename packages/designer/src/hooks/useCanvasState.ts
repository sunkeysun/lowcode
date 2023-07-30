import { useSelector } from 'react-redux';
import { useDesigner } from './useDesigner';

export function useCanvasState() {
  const { designer }  = useDesigner()
  const canvasState = useSelector(() => designer!.documentModel!.getCanvasState())
  return { canvasState }
}
