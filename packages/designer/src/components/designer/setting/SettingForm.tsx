import { useActiveNodeProps } from '../../../hooks/useActiveNodeProps'
import type { ComponentPropSchema, JSSlot, TitleContent } from '../../../types'
import * as setters from '../../../setters'
import { useEffect, useRef } from 'react'
import { useDesigner } from '../../../hooks/useDesigner'
import { useActiveNode } from '../../../hooks/useActiveNode'

type SetterName = keyof typeof setters
type SetterComponent = (p: {
  value: unknown
  onChange: (v: unknown) => void
  [k: string]: unknown
}) => React.ReactNode

function SetterFieldTitle({ title }: { title: TitleContent }) {
  return <h5>{typeof title === 'string' ? title : title.label}</h5>
}

export function SetterField({
  schema,
  value,
  onChange,
}: {
  schema: ComponentPropSchema
  value: unknown
  onChange: (v: Record<string, unknown>) => void
}) {
  const initIdRef = useRef<string>('')
  const { designer } = useDesigner()
  const { activeNode } = useActiveNode()
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

  const SetterComponent = setters[setterName] as SetterComponent

  useEffect(() => {
    if (
      !!activeNode &&
      !!SetterComponent &&
      typeof value === 'undefined' &&
      typeof defaultValue !== 'undefined' &&
      initIdRef.current !== activeNode.id
    ) {
      const activeNodeId = activeNode.id
      initIdRef.current = activeNodeId
      if (setterName === 'SlotSetter') {
        const slotDefaultValue = defaultValue as JSSlot
        const slotNode = designer?.document?.createSlot(
          activeNodeId,
          slotDefaultValue,
        )
        if (slotNode) {
          designer?.document?.appendSlot(slotNode)
          onChange({
            [name]: {
              ...slotDefaultValue,
              id: slotNode.id,
              enabled: !!slotDefaultValue.value?.length,
            },
          })
        }
      } else {
        onChange({ [name]: defaultValue })
      }
    }
  }, [
    SetterComponent,
    value,
    defaultValue,
    onChange,
    name,
    setterName,
    activeNode,
    designer?.document,
  ])

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
  const { schema, props, onChange } = useActiveNodeProps()
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
      {schema.map((setterSchema, index) => (
        <SetterField
          key={index}
          schema={setterSchema}
          value={props[setterSchema.name]}
          onChange={onChange}
        />
      ))}
    </div>
  )
}
