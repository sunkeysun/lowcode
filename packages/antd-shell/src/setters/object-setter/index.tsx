import { EditOutlined } from '@ant-design/icons'
import type { SetterProps, ComponentPropSchema } from '@lowcode/core'
import { SetterField } from '../../components/designer/setting/SettingForm'
import { Popover, Row, Col } from 'antd'

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
    <Row
      style={{
        display: 'flex',
      }}
    >
      {items.length > 2 && (
        <Col>
          <Popover
            placement="left"
            title="编辑数据"
            content={<FormSetter {...props} />}
          >
            <EditOutlined />
          </Popover>
        </Col>
      )}
      {inlineItems.map((item, index) => (
        <Col key={index}>
          <SetterField
            schema={item}
            value={value?.[item.name]}
            onChange={onChange}
          />
        </Col>
      ))}
    </Row>
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
