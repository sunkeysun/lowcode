/**
 * 拖拽节点
 */
import { useEffect, useRef } from 'react';
import { LC_TARGET } from '../common/constants';

export function useDragNode(nodeId: string) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current[LC_TARGET] = {
        id: nodeId,
        type: 'node',
      }
    }
  }, [nodeId])

  return { ref }
}
