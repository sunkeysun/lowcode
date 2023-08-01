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
export type AlignPosition = 'Top' | 'Left' | 'Bottom' | 'Right' | 'In'
export type AlignDirection = 'V' | 'H'

export type DragoverTarget = {
  nodeId: string
  alignPosition: AlignPosition 
  alignDirection: AlignDirection 
  acceptStatus: AcceptStatus
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
