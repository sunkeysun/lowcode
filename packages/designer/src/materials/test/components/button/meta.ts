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
              label: 'Submit',
              value: 'submit',
            },
            {
              label: 'Reset',
              value: 'reset',
            },
            {
              label: 'Button',
              value: 'button',
            },
          ],
        },
      },
      defaultValue: '',
    },
  ],
  snippets: [
    {
      title: '提交按钮',
      schema: {
        componentName,
        props: {
          htmlType: 'submit',
          text: '提交',
        },
      },
    },
    {
      title: '提交按钮',
      schema: {
        componentName,
        props: {
          htmlType: 'reset',
          text: '重置',
        },
      },
    },
  ],
}
