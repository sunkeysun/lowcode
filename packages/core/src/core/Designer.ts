/**
 * Designer
 */
import { type NodeSchema } from '../types'
import { projectUI, store } from '../store'
import { Document } from './document/Document'
import { DragDropPlugin, type Plugin } from '../plugins'
import { Material } from './material'
import { Shell } from './shell'
import { HoverSelectPlugin } from '../plugins/HoverSelectPlugin'
import { CanvasMutatePlugin } from '../plugins/CanvasMutatePlugin'

export class Designer {
  #store = store
  #plugins: Plugin[] = []
  #document: Document | null = null
  #material = new Material(this)
  #shell = new Shell(this)

  constructor() {
    this.initPlugins()
  }

  get shell() {
    return this.#shell
  }

  get store() {
    return this.#store
  }

  get state() {
    return this.store.getState()
  }

  get document() {
    return this.#document
  }

  get material() {
    return this.#material
  }

  get plugins() {
    return this.#plugins
  }

  get dispatch() {
    return this.store.dispatch
  }

  get isReady() {
    return projectUI.selectors.selectReady(this.state)
  }

  setMaterialReady() {
    this.dispatch(projectUI.actions.setReady())
  }

  createDocument(schema: NodeSchema) {
    this.#document = new Document(this, schema)
  }

  initPlugins() {
    this.#plugins.push(
      new DragDropPlugin(this),
      new HoverSelectPlugin(this),
      new CanvasMutatePlugin(this),
    )
  }

  destroy() {
    //
  }
}
