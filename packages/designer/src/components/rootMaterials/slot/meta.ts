import { type ComponentMetaSchema } from '../../../types'

const componentName = 'Slot'
export const Root: ComponentMetaSchema = {
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
