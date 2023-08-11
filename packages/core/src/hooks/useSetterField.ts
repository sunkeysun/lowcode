import type { JSSlot, ComponentPropSchema } from '../types'
import { useEffect, useRef } from 'react'
import { useDesigner } from './useDesigner'
import { useActiveNode } from './useActiveNode'

export function useSetterField({
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
  let setterName = ''
  let setterProps: Record<string, unknown> = {}
  let defaultValue: unknown
  if (typeof setter === 'string') {
    setterName = setter
    setterProps = {}
  } else {
    setterName = setter.componentName
    setterProps = setter.props
    defaultValue = setter.defaultValue
  }

  useEffect(() => {
    if (
      !!activeNode &&
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
  }, [value, defaultValue, onChange, name, activeNode, designer?.document, setterName])

  return { name, title, setterName, setterProps }
}
