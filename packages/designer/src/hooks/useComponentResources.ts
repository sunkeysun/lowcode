import { useSelector } from 'react-redux'
import { useDesigner } from './useDesigner'

export function useComponentResources() {
  const { designer } = useDesigner()
  const resources = useSelector(() =>
    designer?.materialManager.getComponentResources(),
  )
  return { resources }
}
