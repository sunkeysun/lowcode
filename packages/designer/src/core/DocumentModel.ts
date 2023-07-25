/**
 * document model
 */
import { type NodeEntity } from '../store/entities/node'
import { type StoreType, documentEntity, nodeEntity  } from '../store'
import { uniqId } from '../common/util'

interface NodeSchema {
  title: string
  componentName: string
  children: NodeSchema[]
  props: unknown
}

export class DocumentModel {
  #id: string
  #rootNode: NodeEntity

  constructor(private readonly store: StoreType, schema: NodeSchema) {
    this.#id = uniqId()
    this.#rootNode = this.initNodeTree(schema, null)
    this.setRootNodeId(this.#rootNode.id)
    documentEntity.actions.addOne({
      id: this.#id,
      title: schema.title, 
      rootNodeId: this.#rootNode.id,
      activedNodeId: this.#rootNode.id,
    })
  }

  initNodeTree(schema: NodeSchema, parentId: string | null) {
    const { title, componentName, props, children } = schema
    const nodeId = uniqId()
    const node: NodeEntity = {
      id: nodeId,
      title,
      componentName,
      props,
      parentId,
      documentId: this.id,
      childrenIds: !children?.length ? []
        : children.map(
          (child: NodeSchema) => this.initNodeTree(child, nodeId).id,
        ),
    }
    nodeEntity.actions.addOne(node)
    return node   
  }

  get id() {
    return this.#id
  }

  get document() {
    const document = documentEntity.selectors.selectById(this.store.getState(), this.id)
    return document
  }

  get rootNode() {
    if (!this.document) return null
    return nodeEntity.selectors.selectById(this.store.getState(), this.document.rootNodeId)
  }

  get schema() {
    if (!this.rootNode) return null
    return this.getSchema(this.rootNode.id)
  }

  get activedNode() {
    return nodeEntity.selectors.selectById(this.store.getState(), this.document?.activedNodeId as string)
  }

  getSchema(nodeId: string) {
    const targetNode = nodeEntity.selectors.selectById(this.store.getState(), nodeId)
    if (!targetNode) return null

    const { title, componentName, childrenIds, props } = targetNode

    const schema: NodeSchema = {
      title,
      componentName,
      children: childrenIds?.map((childId) => this.getSchema(childId) as NodeSchema).filter(Boolean),
      props,
    }
    return schema
  }

  setRootNodeId(nodeId: string) {
    documentEntity.actions.updateOne({ id: this.id, changes: { rootNodeId: nodeId } })
  }

  setActivedNode(nodeId: string) {
    documentEntity.actions.updateOne({ id: this.id, changes: { activedNodeId: nodeId } })
  }

  destory() {
    //
  }
}
