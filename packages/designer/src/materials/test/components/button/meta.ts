export const Button =  {
  componentName: 'Button',
  title: '按钮',
  propsSetter: [
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
  variants: [
    {
      title: '提交按钮',
      props: {
        htmlType: 'submit',
        children: '提交',
      },
    },
    {
      title: '重置按钮',
      props: {
        htmlType: 'reset',
        children: '重置',
      },
    },
  ]
}
