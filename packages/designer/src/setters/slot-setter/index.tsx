import { SetterProps } from '../../types'
import type { JSSlot } from '../../types'

export function SlotSetter({ value, onChange }: SetterProps<JSSlot | null>) {
  return (
    <label>
      <input
        type="checkbox"
        checked={!!value}
        onChange={() => {
          !value ? onChange({ type: 'JSSlot', value: [] }) : onChange(null)
        }}
      />
    </label>
  )
}
