/**
 * document model
 */
import { type NodeEntity } from '../store/entities/node'
import { documentEntity, documentUI, nodeEntity } from '../store'
import { uniqId } from '../common/util'
import { HoverTarget, type DragoverTarget, type NodeSchema, type CanvasState } from '../types'
import { Designer } from '..'

export class DocumentModel {
  #id: string
  #rootNode: NodeEntity
  #nodeDomMap = new Map<string, HTMLElement>()

  constructor(private readonly designer: Designer, schema: NodeSchema) {
    this.#id = uniqId()
    this.#rootNode = this.initNodeTree(schema, null)
    this.designer.dispatch(
      documentEntity.actions.addOne({
        id: this.#id,
        title: schema.title,
        rootNodeId: this.#rootNode.id,
        activedNodeId: null,
      }),
    )
    this.setRootNodeId(this.#rootNode.id)
    this.setActivedNode(this.#rootNode.id)
  }

  get id() {
    return this.#id
  }

  getDocument() {
    const document = documentEntity.selectors.selectById(
      this.designer.state,
      this.id
    )
    return document
  }

  getRootNode() {
    const document = this.getDocument()
    if (!document) return null
    return nodeEntity.selectors.selectById(
      this.designer.state,
      document.rootNodeId,
    )
  }

  getSchema() {
    const rootNode = this.getRootNode()
    if (!rootNode) return null
    return this.getNodeSchemaById(rootNode.id)
  }

  getActivedNode() {
    const document = this.getDocument()
    return nodeEntity.selectors.selectById(
      this.designer.state,
      document?.activedNodeId as string,
    )
  }

  getDragingTarget() {
    return documentUI.selectors.selectDragingTarget(this.designer.state)
  }

  getDragoverTarget() {
    return documentUI.selectors.selectDragoverTarget(this.designer.state)
  }

  getHoverTarget() {
    return documentUI.selectors.selectHoverTarget(this.designer.state)
  }

  getNodeSchemaById(nodeId: string) {
    const targetNode = nodeEntity.selectors.selectById(
      this.designer.state,
      nodeId,
    )
    if (!targetNode) return null

    const { title, componentName, childrenIds, props } = targetNode

    const schema: NodeSchema = {
      title,
      componentName,
      children: childrenIds
        ?.map((childId) => this.getNodeSchemaById(childId) as NodeSchema)
        .filter(Boolean),
      props,
    }
    return schema
  }

  getNode(nodeId: string) {
    return nodeEntity.selectors.selectById(this.designer.state, nodeId)
  }

  getNodeParents(nodeId: string) {
    let node = this.getNode(nodeId)
    const parents = []
    while (node?.parentId) {
      node = this.getNode(node.parentId)
      parents.push(node)
    }
    return parents
  }

  getNodeDom(nodeId: string) {
    return this.#nodeDomMap.get(nodeId)
  }

  getCanvasState() {
    return documentUI.selectors.selectCanvasState(this.designer.state)
  }

  setCanvasState(canvasState: CanvasState) {
    return this.designer.dispatch(
      documentUI.actions.setCanvasState(canvasState)
    )
  }

  setDraggingTarget(draggingTarget: NodeEntity | null) {
    return this.designer.dispatch(
      documentUI.actions.setDragingTarget(draggingTarget),
    )
  }

  setDragoverTarget(dragoverTarget: DragoverTarget | null) {
    return this.designer.dispatch(
      documentUI.actions.setDragoverTarget(dragoverTarget),
    )
  }

  setHoverTarget(hoverTarget: HoverTarget | null) {
    return this.designer.dispatch(
      documentUI.actions.setHoverTarget(hoverTarget),
    )
  }

  setRootNodeId(nodeId: string) {
    this.designer.dispatch(
      documentEntity.actions.updateOne({ id: this.id, changes: { rootNodeId: nodeId } })
    )
  }

  setActivedNode(nodeId: string) {
    this.designer.dispatch(
      documentEntity.actions.updateOne({ id: this.id, changes: { activedNodeId: nodeId } })
    )
  }

  setTitle(title: string) {
    return this.designer.dispatch(
      documentEntity.actions.updateOne({
        id: this.id,
        changes: { title },
      }),
    )
  }

  appendChild(node: NodeEntity, parentId: string) {
    return this.designer.dispatch(
      nodeEntity.actions.appendChild({ node, parentId }),
    )
  }

  initNodeTree(schema: NodeSchema, parentId: string | null) {
    const { title, componentName, props, children } = schema
    const nodeId = uniqId()
    const documentId = this.id
    const node: NodeEntity = {
      id: nodeId,
      title,
      componentName,
      props,
      parentId,
      documentId,
      childrenIds: !children?.length
        ? []
        : children.map(
          (child: NodeSchema) => this.initNodeTree(child, nodeId).id,
        ),
    }
    this.designer.dispatch(nodeEntity.actions.addOne(node))
    return node
  }

  createNode(componentName: string) {
    const nodeId = uniqId()
    const documentId = this.id
    const node: NodeEntity = {
      id: nodeId,
      title: componentName,
      componentName,
      props: {},
      parentId: null,
      documentId,
      childrenIds: [],
    }
    return node
  }

  mountNode(nodeId: string, dom: HTMLElement) {
    this.#nodeDomMap.set(nodeId, dom)
  }

  unmountNode(nodeId: string) {
    this.#nodeDomMap.delete(nodeId)
  }

  destroy() {
    this.#nodeDomMap.clear()
  }
}
