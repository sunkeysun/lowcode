import type { SetterProps } from '../../types'

export function FunctionSetter({ value, onChange }: SetterProps<string>) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />
}
