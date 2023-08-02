import { ComponentMetaSchema } from '../../types'
import { Designer } from '../Designer'
import { resourceEntity } from '../../store'
import { uniqId } from '../../common/util'

export class MaterialManager {
  #componentMap = new Map<string, unknown>()
  #componentMetaMap = new Map<string, ComponentMetaSchema>()

  constructor(private readonly designer: Designer) {}

  get componentMap() {
    return this.#componentMap
  }

  get componentMetaMap() {
    return this.#componentMetaMap
  }

  getResources() {
    return resourceEntity.selectors.selectAll(this.designer.state)
  }

  getResource(id: string) {
    return resourceEntity.selectors.selectById(this.designer.state, id)
  }

  getComponentMeta(componentName: string) {
    if (!this.componentMetaMap.size) return null
    return this.componentMetaMap.get(componentName)
  }

  getComponent(componentName: string) {
    if (!this.componentMap.size) return null
    return this.componentMap.get(componentName)
  }

  initResources() {
    if (!this.componentMetaMap.size) return
    const resources = Array.from(this.componentMetaMap
      .values())
      .map((componentMeta) =>
        componentMeta.snippets.map((snippet) => ({
          ...snippet,
          id: uniqId(),
        })),
      )
      .flat()
    this.designer.dispatch(resourceEntity.actions.setAll(resources))
  }

  register(
    componentMap: Record<string, unknown>,
    componentMataMap: Record<string, ComponentMetaSchema>,
  ) {
    this.#componentMap = new Map(Object.entries(componentMap))
    this.#componentMetaMap = new Map(Object.entries(componentMataMap))
    this.initResources()
  }

  destroy() {
    this.#componentMap.clear()
    this.#componentMetaMap.clear()
    this.designer.dispatch(resourceEntity.actions.removeAll())
  }
}
