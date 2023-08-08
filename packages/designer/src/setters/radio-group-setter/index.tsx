import type { SetterProps } from '../../types';

interface Props extends SetterProps<unknown> {
  options: Array<{ value: unknown, label: string}>
}

export function RadioGroupSetter({
  value,
  onChange,
  options,
}: Props) {
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
