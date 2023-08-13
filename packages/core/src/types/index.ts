export type Props = Record<string, unknown>

export interface NodeSchema {
  title: string
  componentName: string
  children?: NodeSchema[]
  props: Props
  hidden?: boolean
  isLocked?: boolean
}

export type BehaviorRule = 'move' | 'remove' | 'copy' | 'hover' | 'select' | 'add'

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

export interface AssetSchema {
  packages: AssetPackage[]
}

export interface AssetPackage {
  package: string
  version: string
  urls: string[]
  editUrls: string[]
  components: string[]
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
}

export type SetterType = SetterConfig | string

export type JSSlot = {
  type: 'JSSlot'
  value: NodeSchema[]
  id?: string
  enabled?: boolean
  params?: string[]
  title?: string
}

export type JSFunction = {
  type: 'JSFunction'
  value: string
  title?: string
}

export type JSExpression = {
  type: 'JSExpression'
  value: string
  title?: string
}

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

export type HoverTarget = LCTarget | null

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
