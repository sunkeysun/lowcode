export const Root = {
  componentName: 'Root',
  title: '页面组件',
  propsSetter: [
    {
      name: 'title',
      title: { label: '标题', tip: '默认内容' },
      setter: 'StringSetter',
    },
  ],
  variants: [
    {
      title: '页面组件',
      props: {
        title: '页面组件标题'  
      },
    },
  ]
}
