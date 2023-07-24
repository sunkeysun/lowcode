/**
 * Designer
 */
import EventEmitter from 'eventemitter3'
import { store } from '../store'
import { Shell } from '../shell'
import { DragDropController } from '../shell/controllers/DragDropController'
import { HoverController } from '../shell/controllers/HoverController'

export class Designer {
  #shell: Shell
  #store = store
  #eventBus = new EventEmitter()
  #controllers: unknown[] = []

  constructor() {
    this.#shell = new Shell()
    this.initControllers()
  }

  initControllers() {
    this.#controllers.push(new DragDropController(this.#shell))
    this.#controllers.push(new HoverController(this.#shell))
    // this.#controllers.push(new SelectController(this.#shell))
  }

  get shell() {
    return this.#shell
  }

  get store() {
    return this.#store
  }

  get eventBus() {
    return this.#eventBus
  }
}
