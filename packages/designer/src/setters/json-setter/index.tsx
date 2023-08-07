import { useEffect, useState } from 'react'

export function JsonSetter({ value, onChange }) {
  const [editJson, setEditJson] = useState()

  useEffect(() => {
    setEditJson(JSON.stringify(value, null, 2))
  }, [value])

  return (
    <textarea
      value={editJson}
      onChange={(e) => setEditJson(e.target.value)}
      onBlur={(e) => onChange(JSON.parse(e.target.value))}
    />
  )
}
