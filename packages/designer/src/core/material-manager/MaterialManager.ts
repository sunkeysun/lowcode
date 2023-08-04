import { ComponentMetaSchema } from '../../types'
import { Designer } from '../Designer'
import { resourceEntity } from '../../store'
import { uniqId } from '../../common/util'
import { ComponentBehavior } from './ComponentBehavior'
import { ComponentMeta } from './ComponentMeta'

export class MaterialManager {
  #componentMap = new Map<string, unknown>()
  #componentMetaMap = new Map<string, ComponentMeta>()
  #componentBehaviorMap = new Map<string, ComponentBehavior>()

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
    return this.componentMetaMap.get(componentName)
  }

  getComponentBehavior(componentName: string) {
    return this.#componentBehaviorMap.get(componentName)
  }

  getComponent(componentName: string) {
    return this.componentMap.get(componentName)
  }

  getComponentPropsSchema(componentName: string) {
    const componentMeta = this.getComponentMeta(componentName)
    return componentMeta?.props
  }

  initResources() {
    const resources = Array.from(this.componentMetaMap.values())
      .map((componentMeta) =>
        componentMeta.snippets.map(({ title, schema, screenshot }) => ({
          id: uniqId(),
          title,
          screenshot,
          schema: {
            ...schema,
            title,
          },
        })),
      )
      .flat()
    this.designer.dispatch(resourceEntity.actions.setAll(resources))
  }

  initComponentBehaviors() {
    Array.from(this.componentMetaMap.values()).forEach((componentMeta) =>
      this.#componentBehaviorMap.set(
        componentMeta.componentName,
        new ComponentBehavior(componentMeta),
      ),
    )
  }

  initComponentMetas(componentMetaMap: Record<string, ComponentMetaSchema>) {
    Object.values(componentMetaMap).forEach((componentMeta) =>
      this.#componentMetaMap.set(
        componentMeta.componentName,
        new ComponentMeta(componentMeta),
      ),
    )
  }

  register(
    componentMap: Record<string, unknown>,
    componentMetaMap: Record<string, ComponentMetaSchema>,
  ) {
    this.#componentMap = new Map(Object.entries(componentMap))
    this.initComponentMetas(componentMetaMap)
    this.initComponentBehaviors()
    this.initResources()
  }

  destroy() {
    this.#componentMap.clear()
    this.#componentMetaMap.clear()
    this.#componentBehaviorMap.clear()
    this.designer.dispatch(resourceEntity.actions.removeAll())
  }
}
