import { ComponentMetaSchema } from '../../types'
import { Designer } from '../Designer'
import { resourceEntity } from '../../store'
import { uniqId } from '../../common/util'

export class MaterialManager {
  #componentMap: Record<string, unknown> | null = null
  #componentMetasMap: Record<string, ComponentMetaSchema> | null = null

  constructor(private readonly designer: Designer) {}

  get componentMap() {
    return this.#componentMap
  }

  get componentMetasMap() {
    return this.#componentMetasMap
  }

  getComponentResources() {
    return resourceEntity.selectors.selectAll(this.designer.state)
  }

  getComponentResourceById(id: string) {
    return resourceEntity.selectors.selectById(this.designer.state, id)
  }

  initComponentResources() {
    if (!this.componentMetasMap) return
    const resources = Object.entries(this.componentMetasMap).map(
      ([componentName, meta]) =>
        meta.snippets.map((snippet) => ({
          id: uniqId(),
          componentName,
          ...snippet,
        })),
    ).flat()
    this.designer.dispatch(resourceEntity.actions.setAll(resources))
  }

  getComponentMeta(componentName: string) {
    if (!this.componentMap) return null
    return this.componentMap[componentName]
  }

  register(
    componentMap: Record<string, unknown>,
    componentMatasMap: Record<string, ComponentMetaSchema>,
  ) {
    this.#componentMap = componentMap
    this.#componentMetasMap = componentMatasMap
    this.initComponentResources()
  }

  destroy() {
    this.#componentMap = null
    this.#componentMetasMap = null
    this.designer.dispatch(resourceEntity.actions.removeAll())
  }
}
