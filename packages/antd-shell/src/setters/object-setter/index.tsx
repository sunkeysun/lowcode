import { EditOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import type { SetterProps, ComponentPropSchema } from '@lowcode/core'
import { SetterField } from '../../components/designer/setting/SettingForm'

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
  const inlineItems = items.slice(0, 2)
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {items.length > 2 && (
        <Popover
          trigger="click"
          placement="left"
          title="编辑数据"
          content={<FormSetter {...props} />}
        >
          <EditOutlined />
        </Popover>
      )}
      {inlineItems.map((item, index) => (
        <SetterField
          key={index}
          schema={{ ...item, title: '' }}
          value={value?.[item.name]}
          style={{ marginBottom: 0, marginLeft: 4, marginRight: 4 }}
          onChange={onChange}
        />
      ))}
    </div>
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
