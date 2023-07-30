import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDesigner } from './useDesigner'
import { useEffect } from 'react'
import { useCanvasState } from './useCanvasState'

export function useActivedNode() {
  const [domRect, setDomRect] = useState<DOMRect | null>(null)
  const { designer } = useDesigner()
  const { canvasState } = useCanvasState()
  const activedNode = useSelector(() => designer!.documentModel!.getActivedNode())
  useEffect(() => {
    if (activedNode && canvasState) {
      const nodeDom = designer?.documentModel?.getNodeDom(activedNode.id)
      setDomRect(nodeDom?.getBoundingClientRect() as DOMRect)
    } else {
      setDomRect(null)
    }
  }, [designer?.documentModel, activedNode, canvasState])

  return { activedNode, domRect }
}
