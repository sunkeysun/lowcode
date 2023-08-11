import {
  useActiveNodeProps,
  useSetterField,
  type ComponentPropSchema,
} from '@lowcode/core'
import * as setters from '../../../setters'
import { Form } from 'antd'

type SetterName = keyof typeof setters
type SetterComponent = (p: {
  value: unknown
  onChange: (v: unknown) => void
  [k: string]: unknown
}) => React.ReactNode

export function SetterField({
  schema,
  value,
  onChange,
}: {
  schema: ComponentPropSchema
  value: unknown
  onChange: (v: Record<string, unknown>) => void
}) {
  const { name, title, setterName, setterProps } = useSetterField({
    schema,
    value,
    onChange,
  })

  const SetterComponent = setters[setterName as SetterName] as SetterComponent
  if (!SetterComponent) return <div>Setter未实现({setterName})</div>

  return (
    <Form.Item label={typeof title === 'string' ? title : title.label}>
      <SetterComponent
        {...setterProps}
        value={value}
        onChange={(v: unknown) => onChange({ [name]: v })}
      />
    </Form.Item>
  )
}

export function SettingForm() {
  const { schema, props, onChange } = useActiveNodeProps()
  if (!schema || !props) return null

  return (
    <Form title="设置表单">
      {schema.map((setterSchema, index) => (
        <SetterField
          key={index}
          schema={setterSchema}
          value={props[setterSchema.name]}
          onChange={onChange}
        />
      ))}
    </Form>
  )
}
