/**
 * 拖拽组件
 */
import { useEffect, useRef } from 'react';
import { LC_ELEMENT } from '../common/constants';

export function useDragComponent(componentName: string) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current[LC_ELEMENT] = {
        id: componentName,
        type: 'component',
      }
    }
  }, [ref.current])

  return { ref }
}
