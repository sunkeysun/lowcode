export function SelectSetter({
  value,
  onChange,
  options,
}: {
  value: unknown
  onChange: (v: unknown) => void
  options: { label: string; value: unknown }[]
}) {
  return (
    <select value={value as string} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option value={option.value as string}>{option.label}</option>
      ))}
    </select>
  )
}
