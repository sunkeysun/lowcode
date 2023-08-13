import { SetterField } from '../../components/designer/setting/SettingForm'
import type { SetterProps, SetterType } from '@lowcode/core'
import { Row, Col } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

export function ArraySetter({
  itemSetter,
  value,
  onChange,
}: SetterProps<unknown | unknown[]>) {
  const setter = itemSetter as SetterType
  const valueArr = value as unknown[]

  return (
    <>
      {valueArr?.map((v, index) => (
        <Row>
          <Col>
            <SetterField
              schema={{
                title: '',
                name: String(index),
                setter,
              }}
              value={v}
              onChange={onChange}
            />
          </Col>
          <Col>
            <DeleteOutlined
              onClick={() =>
                onChange(valueArr.filter((_, idx) => index !== idx))
              }
            />
          </Col>
        </Row>
      ))}
      <a
        onClick={() => {
          const defaultValue =
            typeof setter === 'string' ? null : setter?.defaultValue ?? null
          if (!valueArr?.length) {
            onChange([defaultValue])
          } else {
            onChange({ [valueArr.length]: defaultValue })
          }
        }}
      >
        添加一项
      </a>
    </>
  )
}
