import { useDesigner } from './useDesigner';

export function useMaterialComponentBehavior(componentName: string) {
  const { designer } = useDesigner()
  const behavior = designer?.material.getComponentBehavior(componentName)
  return { behavior }
}
