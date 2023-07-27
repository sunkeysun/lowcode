export type Props = Record<string, unknown>

export interface NodeSchema {
  title: string
  componentName: string
  children: NodeSchema[]
  props: Props
}

export type DragOverTarget = {
  target: {
    id: string
    type: 'component' | 'node'
  },
} | null

export interface LCTarget {
  id: string
  type: 'component' | 'node'
}

export interface ComponentMetaSnippet extends NodeSchema {
    thumbnail?: string
}

export interface ComponentMetaSchema {
  componentName: string
  title: string
  props: []
  snippets: ComponentMetaSnippet[]
}
