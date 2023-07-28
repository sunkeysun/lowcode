import { useSelector } from 'react-redux'
import { useDesigner } from './useDesigner'

export function useHoverNode() {
  const { designer } = useDesigner()
  const hoverNode = useSelector(() => designer!.documentModel!.getHoverTarget())
  return { hoverNode }
}
