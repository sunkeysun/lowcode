import { type ComponentMetaSchema } from '../../../../types'

export const Button: ComponentMetaSchema = {
  componentName: 'Button',
  title: '按钮',
  props: [
    {
      name: 'htmlType',
      title: {
        label: '原生类型',
        tip: '这是原生类型',
      },
      setter: [
        {
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
      ],
    },
  ],
  snippets: [
    {
      title: '提交按钮',
      screenshot: '',
      schema: {
        props: {
          htmlType: 'submit',
          text: '提交',
        },
      },
    },
    {
      title: '重置按钮',
      schema: {
        props: {
          htmlType: 'reset',
          text: '重置',
        },
      },
    },
  ],
}
