export type Props = Record<string, unknown>

export interface NodeSchema {
  title: string
  componentName: string
  children: NodeSchema[]
  props: Props
}

export interface ComponentMetaSchema {
  componentName: string
  title: string
  propsSetters: []
  resources: ComponentResouce[]
  slots?: Record<string, ComponentMetaSchema>
  configure: {
    behaviourRule: {
      dragable?: boolean
      dropable?: boolean
      deletable?: boolean
      clonable?: boolean
      lockable?: boolean
      allowChild?: string[]
    },
  },
}

export interface ComponentResouce extends NodeSchema {
  imageUrl?: string
}

export type LcTargetType = 'resource' | 'node'
export type AcceptStatus = 'accept' | 'reject'
export type LayoutPosition = 'Top' | 'Left' | 'Bottom' | 'Right' | 'In'
export type LayoutDirection = 'V' | 'H'

export type DragoverTarget = {
  nodeId: string
  acceptStatus: AcceptStatus
  layoutPosition: LayoutPosition
  layoutDirection: LayoutDirection
} | null

export type HoverTarget = {
  target: LCTarget
} | null

export interface LCTarget {
  id: string
  type: LcTargetType
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
