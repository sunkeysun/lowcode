import type { SetterProps } from '../../types';

interface Props extends SetterProps<unknown> {
  options: Array<{ value: unknown, label: string}>
}

export function SelectSetter({
  value,
  onChange,
  options,
}: Props) {
  return (
    <select value={value as string} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option value={option.value as string}>{option.label}</option>
      ))}
    </select>
  )
}
