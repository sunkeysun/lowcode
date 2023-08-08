import { useEffect, useState } from 'react'
import type { SetterProps } from '../../types'

export function JsonSetter({ value, onChange }: SetterProps<Record<string, unknown>>) {
  const [editJson, setEditJson] = useState<string>()

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
