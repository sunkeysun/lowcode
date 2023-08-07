import { useActivedNodeProps } from '../../hooks/useActivedNodeProps'
import { ComponentPropSchema, Props } from '../../types'
import * as setters from '../../setters'

type SetterName = keyof typeof setters

export function SetterField({
  schema,
  value,
  onChange,
}: {
  schema: ComponentPropSchema
  value: unknown
  onChange: (v: unknown) => void
}) {
  const { name, display, title, setter } = schema
  let setterName: SetterName | null = null
  let setterProps: Record<string, unknown> = {}
  if (typeof setter === 'string') {
    setterName = setter as SetterName
    setterProps = {}
  } else {
    setterName = setter.componentName as SetterName
    setterProps = setter.props
  }

  const SetterComponent = setters[setterName]
  if (!SetterComponent) return <div>Setter未实现({setterName})</div>

  return (
    <div
      style={{
        padding: display === 'block' ? 20 : 0,
      }}
    >
      <h5
        style={{
          backgroundColor: display === 'block' ? 'red' : 'initial',
        }}
      >
        {title.label}
      </h5>
      <div>
        <SetterComponent
          {...setterProps}
          name={name}
          value={value}
          onChange={(v: unknown) => onChange({ [name]: v })}
        />
      </div>
    </div>
  )
}

function SetterRender({
  schema,
  props,
  onChange,
}: {
  schema: ComponentPropSchema[]
  props: Props
  onChange: (v: unknown) => void
}) {
  if (!schema) return

  return schema.map((setterSchema) => (
    <SetterField
      schema={setterSchema}
      value={props[setterSchema.name]}
      onChange={onChange}
    />
  ))
}

export function SettingsForm() {
  const { schema, props, onChange } = useActivedNodeProps()
  if (!schema || !props) return null

  const handleChange = (v: unknown) => {
    onChange(v)
  }

  return (
    <div
      style={{
        width: 200,
        border: '1px solid',
        marginLeft: 800,
      }}
    >
      <h5>设置表单</h5>
      <SetterRender schema={schema} props={props} onChange={handleChange} />
    </div>
  )
}
