import type { SetterProps } from '@lowcode/core'
import { InputNumber } from 'antd'

export function NumberSetter({ value, onChange }: SetterProps<number>) {
  return (
    <InputNumber
      type="number"
      value={value}
      size="small"
      onChange={(value) => onChange(value as number)}
    />
  )
}
