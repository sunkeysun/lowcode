import { useDragComponent } from '../../hooks/useDragComponent'

export function DragComponent({ meta }) {
  const { ref } = useDragComponent(meta.id)

  return <div draggable={true} ref={ref}>{meta.title}</div>
}
