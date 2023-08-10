import { ComponentRender } from '../components/ComponentRender'
import { useRootNode } from '@lowcode/core'

export function ComponentTree() {
  const rootNode = useRootNode()
  return <ComponentRender nodeId={rootNode!.id} />
}
