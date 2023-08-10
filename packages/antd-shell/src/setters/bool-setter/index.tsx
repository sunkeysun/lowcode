import type { SetterProps } from '../../types'

export function BoolSetter({ value, onChange }: SetterProps<boolean>) {
  return (
    <label>
      布尔设置器
      <input
        type="checkbox"
        checked={value === true}
        onChange={() => onChange(!value)}
      />
    </label>
  )
}
