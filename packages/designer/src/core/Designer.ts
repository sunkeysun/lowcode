/**
 * Designer
 */
import { store } from '../store'
import { DocumentModel } from './DocumentModel'
import { DragDropPlugin, type Plugin } from '../plugins'
import { type NodeSchema } from '../types'
import { MaterialManager } from './material-manager'
import { ShellManager } from './shell-manager'
import { HoverSelectPlugin } from '../plugins/HoverSelectPlugin'
import { CanvasMutatePlugin } from '../plugins/CanvasMutatePlugin'

export class Designer {
  #store = store
  #plugins: Plugin[] = []
  #documentModel: DocumentModel | null = null
  #materialManager = new MaterialManager(this)
  #shellManager = new ShellManager(this)

  constructor() {
    this.initPlugins()
  }

  get shellManager() {
    return this.#shellManager
  }

  get store() {
    return this.#store
  }

  get state() {
    return this.store.getState()
  }

  get documentModel() {
    return this.#documentModel
  }

  get materialManager() {
    return this.#materialManager
  }

  get plugins() {
    return this.#plugins
  }

  get dispatch() {
    return this.store.dispatch
  }

  createDocument(schema: NodeSchema) {
    this.#documentModel = new DocumentModel(this, schema)
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
