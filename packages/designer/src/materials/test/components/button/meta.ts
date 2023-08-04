import { type ComponentMetaSchema } from '../../../../types'

const componentName = 'Button'
export const Button: ComponentMetaSchema = {
  componentName,
  title: '按钮',
  props: [
    {
      name: 'htmlType',
      title: {
        label: '原生类型',
        tip: '这是原生类型',
      },
      setter: {
        componentName: 'RadioGroupSetter',
        props: {
          options: [
            {
              label: '提交',
              value: 'submit',
            },
            {
              label: '重置',
              value: 'reset',
            },
            {
              label: '按钮',
              value: 'button',
            },
          ],
        },
      },
    },
  ],
  snippets: [
    {
      title: '提交按钮',
      schema: {
        componentName,
        props: {
          htmlType: 'submit',
        },
      },
    },
    {
      title: '提交按钮',
      schema: {
        componentName,
        props: {
          htmlType: 'reset',
        },
      },
    },
  ],
}
