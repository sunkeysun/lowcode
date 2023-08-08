import type { SetterProps } from '../../types';

export interface RadioGroupSetterProps extends SetterProps<unknown> {
  options: Array<{ value: unknown, label: string}>
}

export function RadioGroupSetter({
  value,
  onChange,
  options,
}: RadioGroupSetterProps) {
  return (
    <>
      {options.map((option) => (
        <label>
          <input
            type="radio"
            checked={value === option.value}
            value={option.value as string}
            onClick={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </>
  )
}
