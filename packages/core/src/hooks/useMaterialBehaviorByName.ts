import { useDesigner } from './useDesigner';

export function useMaterialBehaviorByName(componentName: string) {
  const { designer } = useDesigner()
  const behavior = designer?.material.getBehaviorByName(componentName)
  return { behavior }
}
