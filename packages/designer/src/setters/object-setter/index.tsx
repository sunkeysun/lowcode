import { useState } from 'react'
import { SetterField } from '../../components/designer/setting/SettingForm'
import type { SetterProps, ComponentPropSchema } from '../../types'

export interface ObjectSetterProps
  extends SetterProps<Record<string, unknown>> {
  config: {
    items: ComponentPropSchema[]
  }
  forceInline?: number
}

function FormSetter({ config: { items }, value, onChange }: ObjectSetterProps) {
  return (
    <>
      {items.map((item, index) => (
        <SetterField
          key={index}
          schema={item}
          value={value?.[item.name]}
          onChange={onChange}
        />
      ))}
    </>
  )
}

function RowSetter(props: ObjectSetterProps) {
  const {
    config: { items },
    value,
    onChange,
  } = props
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const inlineItems = items.slice(0, 2)
  return (
    <>
      <div
        style={{
          display: 'flex',
        }}
      >
        {items.length > 2 && (
          <button onClick={() => setIsOpenPopup(true)}>+</button>
        )}
        {inlineItems.map((item, index) => (
          <SetterField
            key={index}
            schema={item}
            value={value?.[item.name]}
            onChange={onChange}
          />
        ))}
      </div>
      <div
        style={{
          position: 'fixed',
          display: isOpenPopup ? 'block' : 'none',
          top: 0,
          left: 0,
        }}
      >
        <button onClick={() => setIsOpenPopup(false)}>x</button>
        <FormSetter {...props} />
      </div>
    </>
  )
}

export function ObjectSetter(props: ObjectSetterProps) {
  const { config, forceInline = 0 } = props
  const { items } = config
  if (!items.length) return null

  if (forceInline) {
    return <RowSetter {...props} />
  }

  return <FormSetter {...props} />
}
