import type { SetterProps, JSExpression } from '@lowcode/core'
import { Input } from 'antd'

export function ExpressionSetter({
  value,
  onChange,
}: SetterProps<JSExpression | null>) {
  return (
    <Input
      value={value?.value}
      size="small"
      onChange={(e) =>
        onChange({ type: 'JSExpression', value: e.target.value })
      }
    />
  )
}
