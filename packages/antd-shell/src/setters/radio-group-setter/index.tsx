import { Radio } from 'antd'
import type { SetterProps } from '@lowcode/core'

export interface RadioGroupSetterProps extends SetterProps<unknown> {
  options: Array<{ value: string | number | boolean; label: string }>
}

export function RadioGroupSetter({
  value,
  onChange,
  options,
}: RadioGroupSetterProps) {
  return (
    <Radio.Group
      value={value}
      onChange={(evt) => onChange(evt.target.value)}
      options={options}
    />
  )
}
