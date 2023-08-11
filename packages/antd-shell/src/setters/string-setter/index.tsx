import type { SetterProps } from '@lowcode/core'
import { Input } from 'antd'

export function StringSetter({ value, onChange }: SetterProps<string>) {
  return <Input value={value} onChange={(e) => onChange(e.target.value)} />
}
