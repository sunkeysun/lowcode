/**
 * 拖拽节点
 */
import { useEffect, useRef } from 'react'
import { LC_TARGET } from '../common/constants'
import { useDesigner } from './useDesigner'

export function useDragNodeById(nodeId: string) {
  const { designer } = useDesigner()
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

  return { ref }
}
