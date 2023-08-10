/**
 * 拖拽节点
 */
import { useEffect, useRef } from 'react'
import { LC_TARGET } from '../common/constants'
import { useDesigner } from './useDesigner'
import { useNodeById } from './useNodeById'

export function useLCNodeById(nodeId: string) {
  const { designer } = useDesigner()
  const { node } = useNodeById(nodeId)
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current[LC_TARGET] = {
        id: nodeId,
        type: 'node',
      }
      designer?.document?.mountNode(nodeId, ref.current)
    }
    return () => designer?.document?.unmountNode(nodeId)
  }, [nodeId, designer])

  return { node, ref }
}
