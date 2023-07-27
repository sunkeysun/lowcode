/**
 * 拖拽组件
 */
import { useEffect, useRef } from 'react';
import { LC_TARGET } from '../common/constants';

export function useDragComponent(componentName: string) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current[LC_TARGET] = {
        id: componentName,
        type: 'component',
      }
    }
  }, [componentName])

  return { ref }
}
