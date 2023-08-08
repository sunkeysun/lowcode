import { SetterProps } from '../../types'

export function NumberSetter({ value, onChange }: SetterProps<number>) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(+e.target.value)}
    />
  )
}
