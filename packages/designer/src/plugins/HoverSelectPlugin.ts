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
      this.designer.shell.subscribeEvent(
        MouseoverEvent,
        this.handleMouseover,
      ),
      this.designer.shell.subscribeEvent(
        MouseleaveEvent,
        this.handleMouseleave,
      ),
      this.designer.shell.subscribeEvent(
        MouseclickEvent,
        this.handleMouseclick,
      ),
    )
  }

  handleMouseover = (ev: MouseoverEvent) => {
    const {
      eventData: { target },
    } = ev
    const activedNode = this.designer.document?.getActivedNode()
    const targetNode = this.designer.document?.getNode(target.id)
    const behavior = this.designer.material.getComponentBehavior(
      targetNode?.componentName as string,
    )
    if (
      !behavior ||
      target.type !== 'node' ||
      activedNode?.id === target.id ||
      !behavior.canHover()
    ) {
      this.designer.document?.setHoverTarget(null)
      return
    }
    this.designer.document?.setHoverTarget({ target })
  }

  handleMouseleave = () => {
    const hoverTarget = this.designer.document?.getHoverTarget()
    if (!hoverTarget) return
    this.designer.document?.setHoverTarget(null)
  }

  handleMouseclick = (ev: MouseclickEvent) => {
    const {
      eventData: { target },
    } = ev
    const hoverTarget = this.designer.document?.getHoverTarget()
    const targetNode = this.designer.document?.getNode(target.id)
    if (!targetNode) return
    if (hoverTarget?.target.id === target.id) {
      this.designer.document?.setHoverTarget(null)
    }
    let activeNodeId = targetNode.id
    const behavior = this.designer.material.getComponentBehavior(
      targetNode.componentName,
    )
    if (!behavior?.canSelect()) {
      activeNodeId = targetNode.parentId as string
    }
    this.designer.document?.setActivedNode(activeNodeId)
  }

  destroy() {
    this.#unsubscribers.forEach((unsubscribe) => unsubscribe())
    this.#unsubscribers = []
  }
}
