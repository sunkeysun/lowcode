/**
 * 终端管理
 */
import { type Designer } from '../Designer';
import { type EngineEvent } from '../../shell/events/EngineEvent'
import EventEmitter from 'eventemitter3'
import { Workbench } from './Workbench';
import { IframeCanvas } from './canvas/IframeCanvas';

type EngineEventCls = { new (): EngineEvent; eventName: string }

export class Shell {
  #workbench: Workbench | null = null
  #iframeCanvas: IframeCanvas | null = null
  #eventBus = new EventEmitter()

  constructor(private readonly designer: Designer) {
    console.log(this.designer)
  }

  dispatchEvent = (event: EngineEvent) => {
    this.#eventBus.emit((event.constructor as EngineEventCls).eventName, event)
  }

  subscribeEvent = <T>(
    E: { new (): T; eventName: string },
    handler: (event: T) => void,
  ) => {
    this.#eventBus.on(E.eventName, handler)
    return () => {
      this.#eventBus.off(E.eventName, handler)
    }
  }

  createWorkbench(container: HTMLElement) {
    this.#workbench = new Workbench(container, this)
    return this.#workbench
  }

  createIframeCanvas(iframeElement: HTMLIFrameElement) {
    this.#iframeCanvas = new IframeCanvas(iframeElement, this)
    return this.#iframeCanvas
  }
}
