import { type ComponentMetaSchema } from '../../../../types'

const componentName = 'Input'
export const Input: ComponentMetaSchema = {
  componentName,
  title: '输入框',
  props: [
    {
      name: 'defaultValue',
      title: { label: '默认值', tip: '默认内容' },
      setter: 'StringSetter',
    },
  ],
  snippets: [
    {
      title: '默认内容',
      schema: {
        componentName,
        props: {
          defaultValue: '默认哈哈哈',
        },
      },
    },
  ],
}
