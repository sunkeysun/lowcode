export type Props = Record<string, unknown>

export interface NodeSchema {
  title: string
  componentName: string
  children: NodeSchema[]
  props: Props
}

export type BehaviorRules = 'move' | 'remove' | 'copy'

export interface ComponentMetaSchema {
  componentName: string
  title: string
  propsSettings: []
  resources: ComponentResouce[]
  slots?: Record<string, ComponentMetaSchema>
  configure: {
    component: {
      isContainer?: boolean
      isModal?: boolean
      rootSelector?: string
      disableBehaviors?: BehaviorRules[]
      nestingRule?: {
        childWhiteList?: string[]
        parentWhiteList?: string[]
      }
    }
  }
}

export interface ComponentResouce extends NodeSchema {
  imageUrl?: string
}

export type LcTargetType = 'resource' | 'node'
export type AcceptStatus = 'accept' | 'reject'
export type AlignPosition = 'top' | 'left' | 'bottom' | 'right' | 'in'
export type AlignDirection = 'vertical' | 'horizontal'

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
  }
  domRect: DOMRect
}
