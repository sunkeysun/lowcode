import { useDesigner } from './useDesigner';

export function useMaterialComponentBehavior(componentName: string) {
  const { designer } = useDesigner()
  const behavior = designer?.materialManager.getComponentBehavior(componentName)
  return { behavior }
}
