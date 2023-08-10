import { type ComponentMetaSchema } from '@lowcode/core'

const componentName = 'Slot'
export const Slot: ComponentMetaSchema = {
  componentName,
  title: 'Slot',
  props: [],
  configure: {
    component: {
      isContainer: true,
      disableBehaviors: [
        'move',
        'remove',
        'copy',
        'hover',
        'select',
        'add',
      ],
    },
  },
  snippets: [
    {
      title: 'Slot',
      schema: {
        componentName,
        props: {},
        children: [],
      },
    },
  ],
}
