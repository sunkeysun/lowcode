import { ComponentMetaSchema } from '../../types'
import { Designer } from '../Designer'
import { resourceEntity } from '../../store'
import { uniqId } from '../../common/util'
import { Behavior } from './Behavior'
import { Meta } from './Meta'

export class Material {
  #componentMap = new Map<string, unknown>()
  #metaMap = new Map<string, Meta>()
  #behaviorMap = new Map<string, Behavior>()

  constructor(private readonly designer: Designer) {}

  get componentMap() {
    return this.#componentMap
  }

  get metaMap() {
    return this.#metaMap
  }

  getResources() {
    return resourceEntity.selectors.selectAll(this.designer.state)
  }

  getResourceById(id: string) {
    return resourceEntity.selectors.selectById(this.designer.state, id)
  }

  getMetaByName(componentName: string) {
    return this.metaMap.get(componentName)
  }

  getBehaviorByName(componentName: string) {
    return this.#behaviorMap.get(componentName)
  }

  getComponentByName(componentName: string) {
    return this.componentMap.get(componentName)
  }

  getPropsSchemaByName(componentName: string) {
    const meta = this.getMetaByName(componentName)
    return meta?.props
  }

  initResources() {
    const resources = Array.from(this.metaMap.values())
      .map((meta) =>
        meta.snippets.map(({ title, schema, screenshot }) => ({
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

  initBehaviors() {
    Array.from(this.metaMap.values()).forEach((meta) =>
      this.#behaviorMap.set(
        meta.componentName,
        new Behavior(meta),
      ),
    )
  }

  initMetas(metaMap: Record<string, ComponentMetaSchema>) {
    Object.values(metaMap).forEach((meta) =>
      this.#metaMap.set(
        meta.componentName,
        new Meta(meta),
      ),
    )
  }

  register(
    componentMap: Record<string, unknown>,
    componentMetaMap: Record<string, ComponentMetaSchema>,
  ) {
    this.#componentMap = new Map(Object.entries(componentMap))
    this.initMetas(componentMetaMap)
    this.initBehaviors()
    this.initResources()
  }

  destroy() {
    this.#componentMap.clear()
    this.#metaMap.clear()
    this.#behaviorMap.clear()
    this.designer.dispatch(resourceEntity.actions.removeAll())
  }
}
