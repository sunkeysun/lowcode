import { SetterField } from '../../components/designer/setting/SettingForm'
import type { SetterProps, ComponentPropSchema } from '../../types'

export interface ObjectSetterProps extends SetterProps<unknown> {
  config: {
    items: ComponentPropSchema[]
    inline?: boolean
  }
}

function ObjectFormSetter() {}

function ObjectRowSetter() {}

export function ObjectSetter({ config, value, onChange }: ObjectSetterProps) {
  const { items, inline } = config
  const objectValue = value as Record<string, unknown>
  if (!items.length) return null

  return (
    <div
      style={{
        display: inline ? 'flex' : 'block',
      }} 
    >
      { inline && <button>+</button> }
      {items.map((schema) => (
        <SetterField
          schema={schema}
          value={objectValue?.[schema.name]}
          onChange={onChange}
        />
      ))}
    </div>
  )
}
