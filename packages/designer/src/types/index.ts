export type Props = Record<string, unknown>

export interface NodeSchema {
  title: string
  componentName: string
  children: NodeSchema[]
  props: Props
}

export type LcTargetType = 'component' | 'node'

export type DragoverTarget = {
  target: LCTarget
} | null

export type HoverTarget = {
  target: LCTarget
} | null

export interface LCTarget {
  id: string
  type: LcTargetType
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
