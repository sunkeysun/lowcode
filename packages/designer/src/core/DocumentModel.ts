/**
 * document model
 */
import { type NodeEntity } from '../store/entities/node'
import { documentEntity, documentUI, nodeEntity } from '../store'
import { uniqId } from '../common/util'
import { type DragOverTarget, type NodeSchema } from '../types'
import { Designer } from '..'

export class DocumentModel {
  #id: string
  #rootNode: NodeEntity

  constructor(private readonly designer: Designer, schema: NodeSchema) {
    this.#id = uniqId()
    this.#rootNode = this.initNodeTree(schema, null)
    this.setRootNodeId(this.#rootNode.id)
    this.designer.dispatch(documentEntity.actions.addOne({
      id: this.#id,
      title: schema.title,
      rootNodeId: this.#rootNode.id,
      activedNodeId: this.#rootNode.id,
    }))
  }

  getId() {
    return this.#id
  }

  getDocument() {
    const document = documentEntity.selectors.selectById(this.designer.state, this.getId())
    return document
  }

  getRootNode() {
    const document = this.getDocument()
    if (!document) return null
    return nodeEntity.selectors.selectById(this.designer.state, document.rootNodeId)
  }

  getSchema() {
    const rootNode = this.getRootNode()
    if (!rootNode) return null
    return this.getSchemaById(rootNode.id)
  }

  getActivedNode() {
    const document = this.getDocument()
    return nodeEntity.selectors.selectById(this.designer.state, document?.activedNodeId as string)
  }

  getDragingTarget() {
    return documentUI.selectors.selectDragingTarget(this.designer.state)
  }

  getDragOverTarget() {
    return documentUI.selectors.selectDragoverTarget(this.designer.state)
  }

  getHoverTarget() {
    return documentUI.selectors.selectHoverTarget(this.designer.state)
  }

  getSchemaById(nodeId: string) {
    const targetNode = nodeEntity.selectors.selectById(this.designer.state, nodeId)
    if (!targetNode) return null

    const { title, componentName, childrenIds, props } = targetNode

    const schema: NodeSchema = {
      title,
      componentName,
      children: childrenIds?.map((childId) => this.getSchemaById(childId) as NodeSchema).filter(Boolean),
      props,
    }
    return schema
  }

  getNodeById(nodeId: string) {
    return () => nodeEntity.selectors.selectById(this.designer.state, nodeId)
  }

  setDraggingTarget(draggingTarget: NodeEntity | null) {
    return this.designer.dispatch(documentUI.actions.setDragingTarget(draggingTarget))
  }

  setDragoverTarget(dragoverTarget: DragOverTarget | null) {
    return this.designer.dispatch(documentUI.actions.setDragoverTarget(dragoverTarget))
  }

  setHoverTarget(hoverTarget: NodeEntity | null) {
    return this.designer.dispatch(documentUI.actions.setHoverTarget(hoverTarget))
  }

  setRootNodeId(nodeId: string) {
    const id = this.getId()
    documentEntity.actions.updateOne({ id, changes: { rootNodeId: nodeId } })
  }

  setActivedNode(nodeId: string) {
    const id = this.getId()
    documentEntity.actions.updateOne({ id, changes: { activedNodeId: nodeId } })
  }

  setTitle(title: string) {
    return this.designer.dispatch(documentEntity.actions.updateOne({ id: this.getId(), changes: { title } }))
  }

  appendChild(node: NodeEntity, parentId: string) {
    return this.designer.dispatch(nodeEntity.actions.appendChild({ node, parentId }))
  }

  initNodeTree(schema: NodeSchema, parentId: string | null) {
    const { title, componentName, props, children } = schema
    const nodeId = uniqId()
    const documentId = this.getId()
    const node: NodeEntity = {
      id: nodeId,
      title,
      componentName,
      props,
      parentId,
      documentId,
      childrenIds: !children?.length ? []
        : children.map(
          (child: NodeSchema) => this.initNodeTree(child, nodeId).id,
        ),
    }
    this.designer.dispatch(nodeEntity.actions.addOne(node))
    return node
  }

  createNode(componentName: string) {
    const nodeId = uniqId()
    const documentId = this.getId()
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
}
