import { useSelector } from 'react-redux'
import { useDesigner } from './useDesigner'

export function useMaterialResources() {
  const { designer } = useDesigner()
  let resources = useSelector(() => designer?.material.getResources())
  resources = resources?.filter((resource) => {
    const behavior = designer?.material.getBehaviorByName(
      resource.schema.componentName,
    )
    return behavior?.canAdd()
  })
  return { resources }
}
