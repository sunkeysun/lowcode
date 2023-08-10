import { SetterField } from '../../components/designer/setting/SettingForm'
import type { SetterProps, SetterType } from '../../types'

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
        <div>
          <SetterField
            schema={{
              title: '',
              name: String(index),
              setter,
            }}
            value={v}
            onChange={onChange}
          />
          <button
            onClick={() => onChange(valueArr.filter((_, idx) => index !== idx))}
          >
            x
          </button>
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
