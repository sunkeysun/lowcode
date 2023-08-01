import { useDragComponent } from '../../hooks/useDragComponent'
import { type ComponentResource } from '../../types'

export function ResourceComponent({ resource }: { resource: ComponentResource }) {
  const { ref } = useDragComponent(resource.id)
  return <div draggable={true} ref={ref}>{resource.title}</div>
}
