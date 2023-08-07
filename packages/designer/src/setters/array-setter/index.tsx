import { SetterField } from '../../components/designer/SettingsForm'

export function ArraySetter({ itemSetter, value, onChange }) {
  let setter = itemSetter
  if (itemSetter.componentName === 'ObjectSetter') {
    setter.props.config.items = setter.props.config.items.filter(
      (item) => item.isRequired,
    )
  }

  return (
    <>
      {value?.map((v, index) => (
        <div>
          <button>+</button>
          <SetterField
            schema={{ title: index, name: index, setter }}
            value={v}
            onChange={onChange}
          />
          <button
            onClick={() => onChange(value.filter((_, idx) => index !== idx))}
          >
            x
          </button>
        </div>
      ))}
      <a
        onClick={() => {
          if (!value?.length) {
            onChange([itemSetter.initialValue])
          } else {
            onChange({ [value.length]: itemSetter.initialValue })
          }
        }}
      >
        添加一项
      </a>
    </>
  )
}
