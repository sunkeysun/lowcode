import { SetterField } from '../../components/designer/SettingsForm'

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
