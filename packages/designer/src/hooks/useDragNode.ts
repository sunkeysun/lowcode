/**
 * 拖拽节点
 */
import { useEffect, useRef } from 'react'
import { LC_TARGET } from '../common/constants'
import { useDesigner } from './useDesigner'
import { useNode } from './useNode'

export function useDragNode(nodeId: string) {
  const { designer } = useDesigner()
  const ref = useRef<HTMLElement>(null)
  const node = useNode(nodeId)
  useEffect(() => {
    if (ref.current && node) {
      ref.current[LC_TARGET] = {
        id: nodeId,
        type: 'node',
      }
      designer?.documentModel?.mountNode(nodeId, ref.current)
    }
    return () => designer?.documentModel?.unmountNode(nodeId)
  }, [nodeId, designer, node])

  return { ref }
}
