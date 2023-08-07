import { useActivedNodeProps } from '../../hooks/useActivedNodeProps'
import { ComponentPropSchema, Props } from '../../types'
import * as setters from '../../setters'

type SetterName = keyof typeof setters

function SetterField({
  schema,
  value,
  onChange,
}: {
  schema: ComponentPropSchema
  value: unknown
  onChange: (v: unknown) => void
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

  if (setterName === 'ObjectSetter') {
    const { items } = setterProps.config
    if (items?.length) {
      return (
        <>
          {items.map((schema) => (
            <SetterField
              schema={schema}
              value={value?.[schema.name]}
              onChange={(v: unknown) => onChange({ [name]: v })}
            />
          ))}
        </>
      )
    }
  }

  if (setterName === 'ArraySetter') {
    const { itemSetter } = setterProps
    return (
      <>
        {value?.map((v, index) => (
          <>
            <SetterField
              schema={{ title, name: index, setter: itemSetter }}
              value={v}
              onChange={(v) => onChange({ [name]: v })}
            />
            <button
              onClick={() =>
                onChange({ [name]: value.filter((v, idx) => index !== idx) })
              }
            >
              x
            </button>
          </>
        ))}
        <a
          onClick={() => {
            if (!value?.length) {
              onChange({ [name]: [itemSetter.initialValue] })
            } else {
              onChange({ [name]: { [value.length]: itemSetter.initialValue } })
            }
          }}
        >
          添加一项
        </a>
      </>
    )
  }

  return (
    <div>
      <label>
        {title.label}?{title.tip}
      </label>
      <div>
        <span>{name}</span>
        <SetterComponent
          {...setterProps}
          value={value}
          onChange={(v: unknown) => onChange({ [name]: v })}
        />
        <span>{name}</span>
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
