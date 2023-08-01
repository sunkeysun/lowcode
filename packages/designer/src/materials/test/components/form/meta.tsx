import { type ComponentMetaSchema } from '../../../../types'

export const Form: ComponentMetaSchema = {
  componentName: 'Form',
  title: '表单容器',
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
      nestingRule: {
        childWhiteList: ['Form.Item'],
      },
    },
  },
  snippets: [
    {
      title: '表单容器',
      schema: {
        title: '表单容器',
        componentName: 'Form',
        children: [
          {
            title: '提交按钮',
            componentName: 'Button',
            children: [],
            props: { htmlType: 'submit', text: '提交' },
          },
        ],
        props: { title: '默认表单标题' },
      },
    },
  ],
}
