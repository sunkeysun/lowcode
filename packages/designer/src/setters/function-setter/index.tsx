import type { SetterProps, JSFunction } from '../../types'

export function FunctionSetter({
  value,
  onChange,
}: SetterProps<JSFunction | null>) {
  return (
    <input
      value={value?.value}
      onChange={(e) => onChange({ type: 'JSFunction', value: e.target.value })}
    />
  )
}
