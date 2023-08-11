import { Panel } from './Panel'

export function OutlinePanel({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <Panel title="大纲树" open={open} onClose={onClose}>
      <div>面板内容</div>
    </Panel>
  )
}
