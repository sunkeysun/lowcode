import { useDesigner } from './useDesigner';

export function useMaterialResourceById(resourceId: string) {
  const { designer } = useDesigner()
  const resource = designer?.material.getResourceById(resourceId)
  return { resource }
}
