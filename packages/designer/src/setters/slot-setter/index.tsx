import { SetterProps } from '../../types'
import type { JSSlot } from '../../types'

export function SlotSetter({ value, onChange }: SetterProps<JSSlot>) {
  return (
    <label>
      <input
        type="checkbox"
        checked={value.enabled}
        onChange={() => {
          value.enabled
            ? onChange({ ...value, enabled: false })
            : onChange({ ...value, enabled: true })
        }}
      />
    </label>
  )
}
