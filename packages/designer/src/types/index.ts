export type Props = Record<string, unknown>

export interface NodeSchema {
  title: string
  componentName: string
  children: NodeSchema[]
  props: Props
}

export type LcTargetType = 'component' | 'node'
export type AtPosition = 'top' | 'left' | 'bottom' | 'right' | 'in'
export type AcceptType = 'accept' | 'reject'

export type DragoverTarget = {
  nodeId: string
  acceptType: AcceptType
  atPosition: AtPosition
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

export interface DOMRect {
  top: number
  left: number
  width: number
  height: number
}

export interface CanvasState {
  scroll: {
    top: number
    left: number
  },
  domRect: DOMRect
}
