import { useSelector } from 'react-redux';
import { useDesigner } from './useDesigner';
import { useEffect, useState } from 'react';
import { useCanvasState } from './useCanvasState';

export function useDragoverNode() {
  const { designer } = useDesigner()
  const dragoverTarget = useSelector(() => designer?.document?.getDragoverTarget())
  const { canvasState } = useCanvasState()
  const [domRect, setDomRect] = useState<DOMRect | null>(null)
  useEffect(() => {
    if (canvasState && dragoverTarget) {
      const nodeDom = designer?.document?.getNodeDom(dragoverTarget?.nodeId)
      if (nodeDom) {
        setDomRect(nodeDom.getBoundingClientRect())
      }
    }
  }, [designer, dragoverTarget, canvasState])

  return { dragoverTarget, domRect }
}
