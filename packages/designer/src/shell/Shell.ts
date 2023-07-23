/**
 * 终端管理
 */
import { DragDropDriver, DragOverDriver } from './events/drivers'
import { IframeCanvas } from './containers/canvas/IframeCanvas'
import { Workbench } from './containers/workbench/Workbench'
import { documentUI, nodeEntity, store } from '../store'
import { uniqId } from '../common/util'
import * as componentsMeta from '../materials/test/meta'

export class Shell {
  dispatch = (name: string, e: any) => {
    if (name === 'custom:dragstart') {
      store.dispatch(documentUI.actions.chnageDraggingElement(e))
    } else if (name === 'custom:dragend') {
      store.dispatch(documentUI.actions.chnageDraggingElement(null))
      store.dispatch(documentUI.actions.changeDragoverElement(null))
    } else if (name === 'custom:dragover') {
      store.dispatch(documentUI.actions.changeDragoverElement(e))
    } else if (name === 'custom:drop') {
      const nodeId = uniqId()
      const draggingElement = documentUI.selectors.selectState(store.getState()).draggingElement
      const [componentName, index] = draggingElement?.info.id.split('-')
      store.dispatch(nodeEntity.actions.appendChild({
        id: nodeId,
        componentName,
        childrenIds: [],
        parentId: e.info.id,
        title: componentsMeta[componentName].variants[index].title,
        props: componentsMeta[componentName].variants[index].props,
      }))
    }
  }

  createWorkbench(container: HTMLElement) {
    const workbench = new Workbench([
      new DragDropDriver(container, this.dispatch),
    ])
    return workbench
  }

  createIframeCanvas(contentDocument: Document) {
    const iframeCanvas = new IframeCanvas([
      new DragDropDriver(contentDocument, this.dispatch),
      new DragOverDriver(contentDocument, this.dispatch),
    ])
    return iframeCanvas
  }
}
