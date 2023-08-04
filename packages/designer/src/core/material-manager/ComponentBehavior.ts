import { type ComponentMeta } from './ComponentMeta'

export class ComponentBehavior {
  constructor(private readonly componentMeta: ComponentMeta) {}

  canDrop(fromComponentMeta: ComponentMeta) {
    const fromNestingRule = fromComponentMeta.configure?.component?.nestingRule
    const nestingRule = this.componentMeta.configure?.component?.nestingRule
    if (!fromNestingRule && !nestingRule) return true
    const { parentWhiteList } = fromNestingRule ?? {}
    const { childWhiteList } = nestingRule ?? {}
    let allowParent = false
    let allowChild = false
    if (!parentWhiteList || parentWhiteList.includes(this.componentMeta.componentName)) {
      allowParent = true
    }
    if (!childWhiteList || childWhiteList.includes(fromComponentMeta.componentName)) {
      allowChild = true
    }
    return allowParent && allowChild
  }

  canMove() {
    return !this.componentMeta.configure?.component?.disableBehaviors?.includes(
      'move',
    )
  }

  canCopy() {
    return !this.componentMeta.configure?.component?.disableBehaviors?.includes(
      'copy',
    )
  }

  canRemove() {
    return !this.componentMeta.configure?.component?.disableBehaviors?.includes(
      'remove',
    )
  }
}
