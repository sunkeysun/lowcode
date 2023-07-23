export const Input = {
  componentName: 'Input',
  title: '输入框',
  propsSetter: [
    {
      name: 'defaultValue',
      title: { label: '默认值', tip: '默认内容' },
      setter: 'StringSetter',
    },
  ],
  variants: [
    {
      title: '默认内容',
      props: {
        defaultValue: '默认哈哈哈'  
      },
    },
  ]
}
