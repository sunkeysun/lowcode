import { useLCResourceById } from '@lowcode/core'

export function LCResource({ resourceId }: { resourceId: string }) {
  const { ref, resource } = useLCResourceById<HTMLDivElement>(resourceId)
  if (!resource) return null

  return <div draggable={true} ref={ref}>{resource.title}</div>
}
