/**
 * Designer
 */
import EventEmitter from 'eventemitter3'
import { store } from '../store'
import { Shell } from '../shell'

export class Designer {
  #shell: Shell
  #store = store
  #eventBus = new EventEmitter()

  constructor() {
    this.#shell = new Shell()
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
