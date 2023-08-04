import { useActivedNodeProps } from '../../hooks/useActivedNodeProps'
import { ComponentPropsSchema } from '../../types'
import * as setters from '../../setters'

type SetterName = keyof typeof setters

function Setter({ schema }: { schema: ComponentPropsSchema }) {
  const { name, title, defaultValue, setter } = schema
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
      <label>
        {title.label}?{title.tip}
      </label>
      <div>
        <span>{name}</span>
        <SetterComponent
          {...setterProps}
          value={defaultValue}
          onChange={(v) => console.log(v)}
        />
        <span>{defaultValue as string}</span>
      </div>
    </div>
  )
}

function SetterRender({ schema }: { schema: ComponentPropsSchema[] }) {
  if (!schema) return

  return schema.map((setterSchema) => <Setter schema={setterSchema} />)
}

export function SettingsForm() {
  const { schema } = useActivedNodeProps()
  if (!schema) return null

  return (
    <div
      style={{
        width: 200,
        border: '1px solid',
        marginLeft: 800,
      }}
    >
      <h5>设置表单</h5>
      <SetterRender schema={schema} />
    </div>
  )
}
