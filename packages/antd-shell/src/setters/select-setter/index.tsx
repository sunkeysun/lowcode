import { Select } from 'antd'
import type { SetterProps } from '@lowcode/core'

export interface SelectSetterProps extends SetterProps<unknown> {
  options: Array<{ value: unknown; label: string }>
}

export function SelectSetter({ value, onChange, options }: SelectSetterProps) {
  return (
    <Select
      value={value}
      options={options}
      size="small"
      onChange={(value) => onChange(value)}
    />
  )
}
