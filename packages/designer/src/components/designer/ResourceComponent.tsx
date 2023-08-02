import { useMaterialResourceComponent } from '../../hooks/useMaterialResourceComponent'
import { type ComponentResource } from '../../types'

export function ResourceComponent({ resource }: { resource: ComponentResource }) {
  const { ref } = useMaterialResourceComponent(resource.id)
  return <div draggable={true} ref={ref}>{resource.schema.title}</div>
}
