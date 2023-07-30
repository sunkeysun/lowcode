import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDesigner } from './useDesigner'
import { useEffect } from 'react'
import { useCanvasState } from './useCanvasState'

export function useHoverNode() {
  const [domRect, setDomRect] = useState<DOMRect | null>(null)
  const { designer } = useDesigner()
  const { canvasState } = useCanvasState()
  const hoverNode = useSelector(() => designer!.documentModel!.getHoverTarget())
  useEffect(() => {
    if (hoverNode && canvasState) {
      const nodeDom = designer?.documentModel?.getNodeDom(hoverNode?.target.id)
      setDomRect(nodeDom?.getBoundingClientRect() as DOMRect)
    } else {
      setDomRect(null)
    }
  }, [designer?.documentModel, hoverNode, canvasState])

  return { hoverNode, domRect }
}
