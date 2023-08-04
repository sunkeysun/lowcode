/**
 * document model
 */
import { type NodeEntity } from '../store/entities/node'
import { documentEntity, documentUI, nodeEntity } from '../store'
import { uniqId } from '../common/util'
import {
  HoverTarget,
  type DragoverTarget,
  type NodeSchema,
  type CanvasState,
  DraggingTarget,
} from '../types'
import { Designer } from '..'

export class DocumentModel {
  #id: string
  #rootNode: NodeEntity
  #nodeDomMap = new Map<string, HTMLElement>()

  constructor(private readonly designer: Designer, schema: NodeSchema) {
    this.#id = uniqId()
    this.#rootNode = this.createNode(schema, null)
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
    this.appendChild(this.#rootNode)
  }

  get id() {
    return this.#id
  }

  getDocument() {
    const document = documentEntity.selectors.selectById(
      this.designer.state,
      this.id,
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

    const { title, componentName, childIds, props, isLocked, hidden } =
      targetNode

    const schema: NodeSchema = {
      title,
      componentName,
      children: childIds
        ?.map((childId) => this.getNodeSchemaById(childId) as NodeSchema)
        .filter(Boolean),
      props,
      isLocked,
      hidden,
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
      documentUI.actions.setCanvasState(canvasState),
    )
  }

  setDraggingTarget(draggingTarget: DraggingTarget | null) {
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
      documentEntity.actions.updateOne({
        id: this.id,
        changes: { rootNodeId: nodeId },
      }),
    )
  }

  setActivedNode(nodeId: string) {
    this.designer.dispatch(
      documentEntity.actions.updateOne({
        id: this.id,
        changes: { activedNodeId: nodeId },
      }),
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

  updateNodeProps({ id, changes }: { id: string, changes: Record<string, unknown>}) {
    return this.designer.dispatch(
      nodeEntity.actions.updateProps({ id, changes })
    )
  }

  appendChild(node: NodeEntity) {
    return this.designer.dispatch(nodeEntity.actions.appendChild(node))
  }

  insertBefore(node: NodeEntity, refId: string) {
    return this.designer.dispatch(
      nodeEntity.actions.insertBefore({ node, refId }),
    )
  }

  insertAfter(node: NodeEntity, refId: string) {
    return this.designer.dispatch(
      nodeEntity.actions.insertAfter({ node, refId }),
    )
  }

  createNode(schema: NodeSchema, parentId: string | null) {
    const childNodes: NodeEntity[] = []
    function create(
      schema: NodeSchema,
      parentId: string | null,
      documentId: string,
    ) {
      const { title, componentName, props, children } = schema
      const nodeId = uniqId()
      const node: NodeEntity = {
        id: nodeId,
        title,
        componentName,
        props,
        parentId,
        documentId,
        childIds: !children?.length
          ? []
          : children.map(
              (child: NodeSchema) => create(child, nodeId, documentId).id,
            ),
        hidden: false,
        isLocked: false,
      }
      childNodes.push(node)
      return node
    }
    const node = create(schema, parentId, this.id)
    return { ...node, childNodes }
  }

  removeNode(nodeId: string) {
    this.designer.dispatch(nodeEntity.actions.remove(nodeId))
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
