import { useMaterialResourceById } from '../../hooks/useMaterialResourceById'
import { type ComponentResource } from '../../types'

export function ResourceComponent({ resource }: { resource: ComponentResource }) {
  const { ref } = useMaterialResourceById(resource.id)
  return <div draggable={true} ref={ref}>{resource.title}</div>
}
