export function SlotSetter({
  value,
  onChange,
}: {
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label>
      布尔设置器
      <input type="checkbox" checked={value === true} onChange={() => onChange(!value)}/>
    </label>
  )
}
