import { type ComponentMetaSchema } from '../../../../types'

export const Form: ComponentMetaSchema = {
  componentName: 'Form.Item',
  title: '表单项目',
  props: [
    {
      name: 'title',
      title: { label: '标题' },
      setter: 'StringSetter',
    },
  ],
  configure: {
    component: {
      isContainer: true,
    },
  },
  snippets: [
    {
      title: '表单项目',
      schema: {
        props: {
          title: '默认表单项目',
        },
      },
    },
  ],
}
