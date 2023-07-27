import { ComponentRender } from '../components/ComponentRender'
import { useRootNode } from '../hooks/useRootNode'

export function ComponentTree() {
  const rootNode = useRootNode()
  return <ComponentRender nodeId={rootNode!.id} />
}
