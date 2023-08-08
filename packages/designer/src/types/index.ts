export type Props = Record<string, unknown>

export interface NodeSchema {
  title: string
  componentName: string
  children?: NodeSchema[]
  props: Props
  slots?: Record<string, NodeSchema>
  hidden?: boolean
  isLocked?: boolean
}

export type BehaviorRule = 'move' | 'remove' | 'copy'

export interface ComponentMetaSchema {
  componentName: string
  title: TitleContent
  props: ComponentPropSchema[]
  snippets: ComponentSnippet[]
  configure?: {
    component?: {
      isContainer?: boolean
      isModal?: boolean
      disableBehaviors?: BehaviorRule[]
      nestingRule?: {
        childWhiteList?: string[]
        parentWhiteList?: string[]
      }
    }
  }
}

export interface ComponentPropSchema {
  name: string
  display?: 'inline' | 'block'
  title: TitleContent
  setter: SetterType
}

export interface ComponentSnippet {
  title: string
  screenshot?: string
  schema: Omit<NodeSchema, 'title'>
}

export interface ComponentResource extends ComponentSnippet {
  id: string
}

export interface Materal<T = unknown> {
  components: Record<string, T>
  componentMetas: Record<string, ComponentMetaSchema>
  setters?: Record<string, T>
}

export interface TitleConfig {
  label: string
  tip: string
}

export type TitleContent = TitleConfig | string

export interface SetterConfig {
  componentName: string
  props: Record<string, unknown>
  defaultValue?: unknown
  isRequired?: boolean
}

export type SetterType = SetterConfig | string

export interface SetterProps<T = unknown> {
  value: T
  onChange: (v: T) => void
  [k: string]: unknown
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
