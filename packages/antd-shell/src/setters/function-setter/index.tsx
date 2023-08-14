import type { SetterProps, JSFunction } from '@lowcode/core'
import { Input } from 'antd'

export function FunctionSetter({
  value,
  onChange,
}: SetterProps<JSFunction | null>) {
  return (
    <Input
      value={value?.value}
      size="small"
      onChange={(evt) =>
        onChange({ type: 'JSFunction', value: evt.target.value })
      }
    />
  )
}
