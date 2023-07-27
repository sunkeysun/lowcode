export const Form = {
  componentName: 'Form',
  title: '表单容器',
  propsSetter: [
    {
      name: 'title',
      title: { label: '标题' },
      setter: 'StringSetter',
    },
  ],
  variants: [
    {
      title: '表单容器',
      props: {
        title: '默认表单标题',
      },
    },
  ],
}
