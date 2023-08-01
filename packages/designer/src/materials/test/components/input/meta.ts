import { type ComponentMetaSchema } from '../../../../types'

export const Input: ComponentMetaSchema = {
  componentName: 'Input',
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
        props: {
          defaultValue: '默认哈哈哈',
        },
      },
    },
  ],
}
