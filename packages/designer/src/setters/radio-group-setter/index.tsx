export function RadioGroupSetter({
  value,
  onChange,
  options,
}: {
  value: unknown
  onChange: (v: unknown) => void
  options: { label: string; value: unknown }[]
}) {
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
