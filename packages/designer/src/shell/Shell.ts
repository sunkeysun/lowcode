/**
 * 终端管理
 */
import { DragDropDriver, DragOverDriver } from './events/drivers'
import { IframeCanvas } from './containers/canvas/IframeCanvas'
import { Workbench } from './containers/workbench/Workbench'
import { type EngineEvent } from './events/types/EngineEvent'
import EventEmitter from 'eventemitter3'

type EngineEventCls = { new(): EngineEvent, eventName: string }

export class Shell {
  private eventBus = new EventEmitter()
  dispatchEvent = (event: EngineEvent) => {
    this.eventBus.emit((event.constructor as EngineEventCls).eventName, event)
    // if (event instanceof DragStartEvent) {
    //   store.dispatch(documentUI.actions.chnageDraggingElement(event.data))
    // }
    // if (name === DragStartEvent) {
    //   store.dispatch(documentUI.actions.chnageDraggingElement(e))
    // } else if (name === 'custom:dragend') {
    //   store.dispatch(documentUI.actions.chnageDraggingElement(null))
    //   store.dispatch(documentUI.actions.changeDragoverElement(null))
    // } else if (name === 'custom:dragover') {
    //   store.dispatch(documentUI.actions.changeDragoverElement(e))
    // } else if (name === 'custom:dragleave') {
    //   store.dispatch(documentUI.actions.changeDragoverElement(null))
    // } else if (name === 'custom:drop') {
    //   const nodeId = uniqId()
    //   const draggingElement = documentUI.selectors.selectState(store.getState()).draggingElement
    //   const [componentName, index] = draggingElement?.info.id.split('-')
    //   store.dispatch(nodeEntity.actions.appendChild({
    //     id: nodeId,
    //     componentName,
    //     childrenIds: [],
    //     parentId: e.info.id,
    //     title: componentsMeta[componentName].variants[index].title,
    //     props: componentsMeta[componentName].variants[index].props,
    //   }))
    // }
  }

  subscribeEvent = <T>(E: { new(): T, eventName: string }, handler: (event: T) => void) => {
    this.eventBus.on(E.eventName, handler)
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
