/**
 * 拖拽资源
 */
import { useEffect, useRef } from 'react';
import { LC_TARGET } from '../common/constants';

export function useComponentResource(resourceId: string) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current[LC_TARGET] = {
        id: resourceId,
        type: 'resource',
      }
    }
  }, [resourceId])

  return { ref }
}
