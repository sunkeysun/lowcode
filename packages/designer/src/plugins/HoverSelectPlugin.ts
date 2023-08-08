/**
 * 悬停插件
 */
import { type Designer } from '..'
import { MouseleaveEvent, MouseoverEvent, MouseclickEvent } from '../shell'
import { Plugin } from './Plugin'

export class HoverSelectPlugin extends Plugin {
  #unsubscribers: Array<() => void> = []
  constructor(private readonly designer: Designer) {
    super()
    this.#unsubscribers.push(
      this.designer.shellManager.subscribeEvent(
        MouseoverEvent,
        this.handleMouseover,
      ),
      this.designer.shellManager.subscribeEvent(
        MouseleaveEvent,
        this.handleMouseleave,
      ),
      this.designer.shellManager.subscribeEvent(
        MouseclickEvent,
        this.handleMouseclick,
      ),
    )
  }

  handleMouseover = (ev: MouseoverEvent) => {
    const {
      eventData: { target },
    } = ev
    const activedNode = this.designer.documentModel?.getActivedNode()
    const targetNode = this.designer.documentModel?.getNode(target.id)
    if (
      target.type !== 'node' ||
      activedNode?.id === target.id ||
      targetNode?.componentName === 'Slot'
    ) {
      this.designer.documentModel?.setHoverTarget(null)
      return
    }
    this.designer.documentModel?.setHoverTarget({ target })
  }

  handleMouseleave = () => {
    const hoverTarget = this.designer.documentModel?.getHoverTarget()
    if (!hoverTarget) return
    this.designer.documentModel?.setHoverTarget(null)
  }

  handleMouseclick = (ev: MouseclickEvent) => {
    const {
      eventData: { target },
    } = ev
    const hoverTarget = this.designer.documentModel?.getHoverTarget()
    const targetNode = this.designer.documentModel?.getNode(target.id)
    if (!targetNode) return
    if (hoverTarget?.target.id === target.id) {
      this.designer.documentModel?.setHoverTarget(null)
    }
    let activeNodeId = targetNode.id
    if (targetNode?.componentName === 'Slot') {
      activeNodeId = targetNode.parentId as string
    }
    this.designer.documentModel?.setActivedNode(activeNodeId)
  }

  destroy() {
    this.#unsubscribers.forEach((unsubscribe) => unsubscribe())
    this.#unsubscribers = []
  }
}
