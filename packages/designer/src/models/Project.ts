
/**
 * project model
 */
import { Model } from './Model'
import { type StoreType } from '../store'
import { Document } from './Document'
import { projectUI, documentEntity } from '../store'

interface ProjectSchema {
  version: string
  componentTree: NodeSchema[]
}
interface NodeSchema {
  title: string
  componentName: string
  children: NodeSchema[]
  props: unknown
}

export class Project extends Model {
  constructor(private readonly store: StoreType, schema: ProjectSchema) {
    super()
    this.init(schema.componentTree)
  }

  init(schemas: NodeSchema[]) {
    schemas.map((schema) => new Document(this.store, schema))
  }

  get activedDocument() {
    const { activedDocumentId } = projectUI.selectors.selectState(this.store.getState())
    if (!activedDocumentId) return null
    const document = documentEntity.selectors.selectById(this.store.getState(), activedDocumentId)
    return document
  }

  setActivedDocument(documentId: string) {
    projectUI.actions.setActivedDocumentId(documentId)
  }

  createDocument() {
    //
  }
}
