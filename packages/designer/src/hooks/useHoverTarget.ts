import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDesigner } from './useDesigner'
import { useEffect } from 'react'
import { useCanvasState } from './useCanvasState'

export function useHoverTarget() {
  const [domRect, setDomRect] = useState<DOMRect | null>(null)
  const { designer } = useDesigner()
  const { canvasState } = useCanvasState()
  const hoverTarget = useSelector(() => designer!.document!.hoverTarget)
  useEffect(() => {
    if (hoverTarget && canvasState) {
      const nodeDom = designer?.document?.getNodeDomById(hoverTarget?.id)
      setDomRect(nodeDom?.getBoundingClientRect() as DOMRect)
    } else {
      setDomRect(null)
    }
  }, [designer?.document, hoverTarget, canvasState])

  return { hoverTarget, domRect }
}
