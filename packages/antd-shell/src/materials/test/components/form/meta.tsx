import { type ComponentMetaSchema } from '../../../../types'

const componentName = 'Form'
export const Form: ComponentMetaSchema = {
  componentName,
  title: '表单容器',
  props: [
    {
      name: 'title',
      title: '标题',
      setter: 'StringSetter',
    },
  ],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        childWhiteList: ['Form.Item', 'Button'],
      },
    },
  },
  snippets: [
    {
      title: '表单容器',
      schema: {
        componentName,
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
