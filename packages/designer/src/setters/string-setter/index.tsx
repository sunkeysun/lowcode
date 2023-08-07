export function StringSetter({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />
}
