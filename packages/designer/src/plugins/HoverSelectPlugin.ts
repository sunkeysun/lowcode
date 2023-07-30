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
    if (target.type !== 'node' || activedNode?.id === target.id) return
    this.designer.documentModel?.setHoverTarget({ target })
  }

  handleMouseleave = () => {
    const hoverTarget = this.designer.documentModel?.getHoverTarget()
    if (!hoverTarget) return
    this.designer.documentModel?.setHoverTarget(null)
  }

  handleMouseclick = (ev: MouseclickEvent) => {
    const { eventData: { target } } = ev
    const hoverTarget = this.designer.documentModel?.getHoverTarget()
    if (hoverTarget?.target.id === target.id) {
      this.designer.documentModel?.setHoverTarget(null)
    }
    this.designer.documentModel?.setActivedNode(target.id)
  }

  destroy() {
    this.#unsubscribers.forEach((unsubscribe) => unsubscribe())
    this.#unsubscribers = []
  }
}
