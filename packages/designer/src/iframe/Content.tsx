import { useSelector } from 'react-redux'
import { ComponentRender } from '../components/ComponentRender'
import { RootState, documentEntity, documentUI, nodeEntity } from '../store'

export function Content() {
  const documentId = useSelector(documentUI.selectors.selectState).selectedId
  const document = useSelector((state: RootState) =>
    documentEntity.selectors.selectById(state, documentId as string),
  )

  return <ComponentRender nodeId={document?.rootNodeId} />
}
