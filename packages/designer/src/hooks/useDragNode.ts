/**
 * 拖拽节点
 */
import { useEffect, useRef } from 'react';
import { LC_ELEMENT } from '../common/constants';

export function useDragNode(componentName: string) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current[LC_ELEMENT] = {
        id: componentName,
        type: 'node',
      }
    }
  }, [ref.current])

  return { ref }
}
