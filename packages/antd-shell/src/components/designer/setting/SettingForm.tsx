import {
  useActiveNodeProps,
  useSetterField,
  type ComponentPropSchema,
} from '@lowcode/core'
import * as setters from '../../../setters'
import { Form, Layout, Tabs } from 'antd'

type SetterName = keyof typeof setters
type SetterComponent = (p: {
  value: unknown
  onChange: (v: unknown) => void
  [k: string]: unknown
}) => React.ReactNode

export function SetterField({
  schema,
  value,
  onChange,
}: {
  schema: ComponentPropSchema
  value: unknown
  onChange: (v: Record<string, unknown>) => void
}) {
  const { name, title, display, setterName, setterProps } = useSetterField({
    schema,
    value,
    onChange,
  })

  const SetterComponent = setters[setterName as SetterName] as SetterComponent
  if (!SetterComponent) return <div>Setter未实现({setterName})</div>

  const formItem = (
    <Form.Item
      label={typeof title === 'string' ? title : title.label}
      style={{ marginBottom: 16 }}
    >
      <SetterComponent
        {...setterProps}
        value={value}
        onChange={(v: unknown) => onChange({ [name]: v })}
      />
    </Form.Item>
  )

  if (display === 'block') {
    return <Form layout="vertical">{formItem}</Form>
  }

  return formItem
}

export function SettingForm() {
  const { schema, props, onChange } = useActiveNodeProps()
  if (!schema || !props) return null

  return (
    <Tabs
      activeKey="props"
      centered
      items={[
        {
          key: 'props',
          label: '属性',
          children: (
            <Layout style={{ padding: 12, backgroundColor: 'transparent' }}>
              <Form colon={false} component={false} title="设置表单">
                {schema.map((setterSchema, index) => (
                  <SetterField
                    key={index}
                    schema={setterSchema}
                    value={props[setterSchema.name]}
                    onChange={onChange}
                  />
                ))}
              </Form>
            </Layout>
          ),
        },
      ]}
    />
  )
}
