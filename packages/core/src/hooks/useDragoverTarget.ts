import { useSelector } from 'react-redux';
import { useDesigner } from './useDesigner';
import { useEffect, useState } from 'react';
import { useCanvasState } from './useCanvasState';

export function useDragoverTarget() {
  const { designer } = useDesigner()
  const dragoverTarget = useSelector(() => designer?.document?.dragoverTarget)
  const { canvasState } = useCanvasState()
  const [domRect, setDomRect] = useState<DOMRect | null>(null)
  useEffect(() => {
    if (canvasState && dragoverTarget) {
      const nodeDom = designer?.document?.getNodeDomById(dragoverTarget?.nodeId)
      if (nodeDom) {
        setDomRect(nodeDom.getBoundingClientRect())
      }
    }
  }, [designer, dragoverTarget, canvasState])

  return { dragoverTarget, domRect }
}
