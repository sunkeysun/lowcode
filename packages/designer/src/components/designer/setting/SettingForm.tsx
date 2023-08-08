import { useActivedNodeProps } from '../../../hooks/useActivedNodeProps'
import type { ComponentPropSchema, TitleContent } from '../../../types'
import * as setters from '../../../setters'

type SetterName = keyof typeof setters

function SetterFieldTitle({ title }: { title: TitleContent }) {
  return <h5>{typeof title === 'string' ? title : title.label}</h5>
}

export function SetterField({
  schema,
  value,
  onChange,
}: {
  schema: ComponentPropSchema
  value: unknown | unknown[]
  onChange: (v: unknown | unknown[]) => void
}) {
  const { name, title, setter } = schema
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
    <div>
      <SetterFieldTitle title={title} />
      <SetterComponent
        {...setterProps}
        value={value}
        onChange={(v: unknown) => onChange({ [name]: v })}
      />
    </div>
  )
}

export function SettingForm() {
  const { schema, props, onChange } = useActivedNodeProps()
  if (!schema || !props) return null

  return (
    <div
      style={{
        width: 200,
        border: '1px solid',
        marginLeft: 800,
      }}
    >
      <h5>设置表单</h5>
      {schema.map((setterSchema) => (
        <SetterField
          schema={setterSchema}
          value={props[setterSchema.name]}
          onChange={onChange}
        />
      ))}
    </div>
  )
}