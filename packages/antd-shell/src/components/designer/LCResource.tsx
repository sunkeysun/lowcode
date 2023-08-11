import { Button } from 'antd'
import { useLCResourceById } from '@lowcode/core'

export function LCResource({ resourceId }: { resourceId: string }) {
  const { ref, resource } = useLCResourceById<HTMLDivElement>(resourceId)
  if (!resource) return null

  return (
    <Button draggable={true} ref={ref}>
      {resource.title}
    </Button>
  )
}
