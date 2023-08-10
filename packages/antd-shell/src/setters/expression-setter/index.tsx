import type { SetterProps, JSExpression } from '../../types'

export function ExpressionSetter({
  value,
  onChange,
}: SetterProps<JSExpression | null>) {
  return (
    <input
      value={value?.value}
      onChange={(e) =>
        onChange({ type: 'JSExpression', value: e.target.value })
      }
    />
  )
}
