import { useActivedNodeProps } from '../../../hooks/useActivedNodeProps'
import type { ComponentPropSchema, JSSlot, TitleContent } from '../../../types'
import * as setters from '../../../setters'
import { useCallback, useEffect, useRef } from 'react'
import { useDesigner } from '../../../hooks/useDesigner'
import { useActivedNode } from '../../../hooks/useActivedNode'

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
  value: any
  onChange: (v: any) => void
}) {
  const initRef = useRef(false)
  const { designer } = useDesigner()
  const { activedNode } = useActivedNode()
  const { name, title, setter } = schema
  let setterName: SetterName | null = null
  let setterProps: Record<string, unknown> = {}
  let defaultValue: unknown
  if (typeof setter === 'string') {
    setterName = setter as SetterName
    setterProps = {}
  } else {
    setterName = setter.componentName as SetterName
    setterProps = setter.props
    defaultValue = setter.defaultValue
  }

  const SetterComponent = setters[setterName]

  useEffect(() => {
    if (
      !!SetterComponent &&
      typeof value === 'undefined' &&
      typeof defaultValue !== 'undefined' &&
      !initRef.current
    ) {
      initRef.current = true
      onChange({ [name]: defaultValue })
    }
  }, [SetterComponent, value, defaultValue, onChange, name])

  if (!SetterComponent) return <div>Setter未实现({setterName})</div>

  return (
    <>
      <SetterFieldTitle title={title} />
      <SetterComponent
        {...setterProps}
        value={value}
        onChange={(v: unknown) => onChange({ [name]: v })}
      />
    </>
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
