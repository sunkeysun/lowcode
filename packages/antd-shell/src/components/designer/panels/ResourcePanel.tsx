import { useMaterialResources } from '@lowcode/core'
import { Panel } from './Panel'
import { LCResource } from '../LCResource'
import { Space } from 'antd'

export function ResourcePanel({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { resources } = useMaterialResources()

  return (
    <Panel title="组件" open={open} onClose={onClose}>
      <Space>
        {resources?.map((resource) => (
          <LCResource key={resource.id} resourceId={resource.id} />
        ))}
      </Space>
    </Panel>
  )
}
