/**
 * Designer
 */
import EventEmitter from 'eventemitter3'
import { store } from '../store'
import { Shell } from '../shell'
import { DocumentModel } from './DocumentModel'
import { DragDropPlugin, type Plugin } from '../plugins'
import { type NodeSchema } from '../types'

export class Designer {
  #shell: Shell
  #store = store
  #eventBus = new EventEmitter()
  #plugins: Plugin[] = []
  #documentModel: DocumentModel | null = null

  constructor() {
    this.#shell = new Shell()
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

  get eventBus() {
    return this.#eventBus
  }

  get documentModel() {
    return this.#documentModel
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
    this.#plugins.push(new DragDropPlugin(this))
  }
}
