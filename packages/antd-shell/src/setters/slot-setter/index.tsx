import { Switch } from 'antd'
import type { SetterProps, JSSlot } from '@lowcode/core'

export function SlotSetter({ value, onChange }: SetterProps<JSSlot>) {
  if (!value) return null

  const handleChange = (checked: boolean) => {
    onChange({ ...value, enabled: checked })
  }

  return <Switch checked={value?.enabled} onChange={handleChange} />
}
