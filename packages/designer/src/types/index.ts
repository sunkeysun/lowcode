export type Props = Record<string, unknown>

export interface NodeSchema {
  title: string
  componentName: string
  children?: NodeSchema[]
  props: Props
}

export type BehaviorRule = 'move' | 'remove' | 'copy'

export interface ComponentMetaSchema {
  componentName: string
  title: string
  props: Record<string, unknown>[]
  snippets: ComponentSnippet[]
  slots?: Record<string, ComponentMetaSchema>
  configure?: {
    component?: {
      isContainer?: boolean
      isModal?: boolean
      rootSelector?: string
      disableBehaviors?: BehaviorRule[]
      nestingRule?: {
        childWhiteList?: string[]
        parentWhiteList?: string[]
      }
    }
  }
}

export interface ComponentSnippet {
  screenshot?: string
  schema: NodeSchema
}

export interface ComponentResource extends Omit<ComponentSnippet, 'schema'> {
  id: string
  schema: NodeSchema
}

export type LcTargetType = 'resource' | 'node'
export type AcceptStatus = 'accept' | 'reject'
export type AlignPosition = 'top' | 'left' | 'bottom' | 'right' | 'in'
export type AlignDirection = 'vertical' | 'horizontal'

export type DraggingTarget = LCTarget

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
