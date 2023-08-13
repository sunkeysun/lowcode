/**
 * 拖拽节点
 */
import { LC_TARGET } from '../common/constants'
import { useDesigner } from './useDesigner'
import { useNodeById } from './useNodeById'

export function useLCNodeById(nodeId: string) {
  const { designer } = useDesigner()
  const { node } = useNodeById(nodeId)

  const handleRef = (ref: HTMLElement) => {
    if (ref) {
      ref[LC_TARGET] = {
        id: nodeId,
        type: 'node',
      }
      designer?.document?.mountNode(nodeId, ref)
    } else {
      designer?.document?.unmountNode(nodeId)
    }
  }

  return { node, ref: handleRef }
}
