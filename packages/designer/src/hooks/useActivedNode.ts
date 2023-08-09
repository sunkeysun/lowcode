import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDesigner } from './useDesigner'
import { useEffect } from 'react'
import { useCanvasState } from './useCanvasState'

export function useActivedNode() {
  const [domRect, setDomRect] = useState<DOMRect | null>(null)
  const { designer } = useDesigner()
  const { canvasState } = useCanvasState()
  const activedNode = useSelector(() =>
    designer!.documentModel!.getActivedNode(),
  )
  useEffect(() => {
    if (activedNode && canvasState) {
      const nodeDom = designer?.documentModel?.getNodeDom(activedNode.id)
      const domRect = nodeDom?.getBoundingClientRect() ?? null
      setDomRect(domRect)
    } else {
      setDomRect(null)
    }
  }, [designer?.documentModel, activedNode, canvasState])

  const remove = () => {
    if (activedNode?.id) {
      designer?.documentModel?.removeNode(activedNode.id)
      if (activedNode.parentId) {
        const parentNode = designer?.documentModel?.getNode(activedNode.parentId)
        if (parentNode?.componentName === 'Slot') {
          designer?.documentModel?.setActivedNode(parentNode.parentId as string)
        } else {
          designer?.documentModel?.setActivedNode(activedNode.parentId)
        }
      } else {
        designer?.documentModel?.setActivedNode(
          designer?.documentModel?.getRootNode()?.id as string,
        )
      }
    }
  }

  return { activedNode, domRect, remove }
}
