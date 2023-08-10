import { useSelector } from 'react-redux'
import { useDesigner } from './useDesigner'

export function useMaterialResources() {
  const { designer } = useDesigner()
  const resources = useSelector(() => designer?.material.getResources())
  return { resources }
}
