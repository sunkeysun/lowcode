import {
  useActiveNodeProps,
  useSetterField,
  type ComponentPropSchema,
} from '@lowcode/core'
import { type CSSProperties } from 'react'
import * as setters from '../../../setters'
import { Form, Layout, Tabs, Tooltip, Typography } from 'antd'

type SetterName = keyof typeof setters
type SetterComponent = (p: {
  value: unknown
  onChange: (v: unknown) => void
  [k: string]: unknown
}) => React.ReactNode

export function SetterField({
  schema,
  value,
  style = { marginBottom: 8 },
  onChange,
}: {
  schema: ComponentPropSchema
  value: unknown
  style?: CSSProperties
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
      label={
        typeof title === 'string' ? (
          title
        ) : (
          <Tooltip title={title.tip}>{title.label}</Tooltip>
        )
      }
      style={style}
    >
      <SetterComponent
        {...setterProps}
        value={value}
        onChange={(v: unknown) => onChange({ [name]: v })}
      />
    </Form.Item>
  )

  if (display === 'block') {
    return (
      <>
        <Typography.Title
          level={5}
          style={{
            margin: '0 -12px',
            backgroundColor: 'rgba(150,150,150,.1)',
            padding: '2px 12px',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {typeof title === 'string' ? title : title.label}
        </Typography.Title>
        <div style={{ padding: 8 }}>
          <SetterComponent
            {...setterProps}
            value={value}
            onChange={(v: unknown) => onChange({ [name]: v })}
          />
        </div>
      </>
    )
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
              <Form
                labelCol={{ span: 6 }}
                style={{ fontSize: 12 }}
                labelAlign="left"
                labelWrap
                colon={false}
                component={false}
                title="设置表单"
              >
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
