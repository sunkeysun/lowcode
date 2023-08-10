import { type ComponentMetaSchema } from '@lowcode/core'

const componentName = 'Root'
export const Root: ComponentMetaSchema = {
  componentName,
  title: '页面组件',
  props: [
    {
      name: 'title',
      title: { label: '标题', tip: '默认内容' },
      setter: 'StringSetter',
    },
  ],
  configure: {
    component: {
      isContainer: true,
      disableBehaviors: [
        'move',
        'remove',
        'copy',
        'add',
      ],
    },
  },
  snippets: [
    {
      title: '页面组件',
      schema: {
        componentName,
        props: {
          title: '页面组件标题',
        },
        children: [],
      },
    },
  ],
}
