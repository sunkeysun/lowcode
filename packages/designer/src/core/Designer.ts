/**
 * Designer
 */
import { store } from '../store'
import { DocumentModel } from './DocumentModel'
import { DragDropPlugin, type Plugin } from '../plugins'
import { type NodeSchema } from '../types'
import { ComponentManager } from './managers/ComponentManager'
import { ShellManager } from './managers/shellManager'
import { HoverSelectPlugin } from '../plugins/HoverSelectPlugin'

export class Designer {
  #store = store
  #plugins: Plugin[] = []
  #documentModel: DocumentModel | null = null
  #componentManager = new ComponentManager(this)
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

  get componentManager() {
    return this.#componentManager
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
    this.#plugins.push(new DragDropPlugin(this), new HoverSelectPlugin(this))
  }

  destroy() {
    //
  }
}
