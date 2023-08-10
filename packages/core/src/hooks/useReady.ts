import { useSelector } from 'react-redux';
import { useDesigner } from './useDesigner';

export function useReady() {
  const { designer } = useDesigner()
  const isReady = useSelector(() => designer?.isReady)
  return { isReady }
}
