export function NumberSetter({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(+e.target.value)}
    />
  )
}
