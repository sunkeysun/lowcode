import { useComponentResource } from '../../hooks/useComponentResource'
import { type ComponentResource } from '../../types'

export function Resource({ resource }: { resource: ComponentResource }) {
  const { ref } = useComponentResource(resource.id)
  return <div draggable={true} ref={ref}>{resource.schema.title}</div>
}
