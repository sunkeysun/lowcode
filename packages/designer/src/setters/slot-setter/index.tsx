import { SetterProps } from '../../types'

export function SlotSetter({ value, onChange }: SetterProps<boolean>) {
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
