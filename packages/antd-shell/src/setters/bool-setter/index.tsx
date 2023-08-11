import type { SetterProps } from '@lowcode/core'
import { Switch } from 'antd'

export function BoolSetter({ value, onChange }: SetterProps<boolean>) {
  return <Switch checked={value} onChange={onChange} />
}
