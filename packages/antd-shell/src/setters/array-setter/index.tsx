import { SetterField } from '../../components/designer/setting/SettingForm'
import type { SetterProps, SetterType } from '@lowcode/core'
import { DeleteOutlined, DragOutlined } from '@ant-design/icons'

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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SetterField
            schema={{
              title: '',
              name: String(index),
              setter,
            }}
            style={{ marginBottom: 2 }}
            value={v}
            onChange={onChange}
          />
          <DragOutlined
            onClick={() => onChange(valueArr.filter((_, idx) => index !== idx))}
          />
          <DeleteOutlined
            style={{ marginLeft: 12 }}
            onClick={() => onChange(valueArr.filter((_, idx) => index !== idx))}
          />
        </div>
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
