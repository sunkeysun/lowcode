import { SetterField } from '../../components/designer/setting/SettingForm'

function ObjectFormSetter() {

}

function ObjectRowSetter() {

}

export function ObjectSetter({ config, value, onChange }) {
  const { items } = config
  if (items?.length) {
    return (
      <>
        {items.map((schema) => (
          <SetterField
            schema={schema}
            value={value?.[schema.name]}
            onChange={onChange}
          />
        ))}
      </>
    )
  }
  return null
}
