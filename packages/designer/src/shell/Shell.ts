/**
 * 终端管理
 */
import { DragDropDriver, DragOverDriver } from './events/drivers'
import { type EngineEvent } from './events/types/EngineEvent'
import EventEmitter from 'eventemitter3'

type EngineEventCls = { new(): EngineEvent, eventName: string }

export class Shell {
  private eventBus = new EventEmitter()
  dispatchEvent = (event: EngineEvent) => {
    this.eventBus.emit((event.constructor as EngineEventCls).eventName, event)
  }

  subscribeEvent = <T>(E: { new(): T, eventName: string }, handler: (event: T) => void) => {
    this.eventBus.on(E.eventName, handler)
    return () => this.eventBus.off(E.eventName, handler)
  }

  createWorkbench(container: HTMLElement) {
    const workbench = [
      new DragDropDriver(container, this.dispatchEvent),
    ]
    return workbench
  }

  createIframeCanvas(contentDocument: Document) {
    const iframeCanvas = [
      new DragDropDriver(contentDocument, this.dispatchEvent),
      new DragOverDriver(contentDocument, this.dispatchEvent),
    ]
    return iframeCanvas
  }
}
