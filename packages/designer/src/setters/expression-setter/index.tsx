import type { SetterProps } from '../../types'

export function ExpressionSetter({ value, onChange }: SetterProps<string>) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />
}
