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
    designer!.document!.getActivedNode(),
  )
  useEffect(() => {
    if (activedNode && canvasState) {
      const nodeDom = designer?.document?.getNodeDom(activedNode.id)
      const domRect = nodeDom?.getBoundingClientRect() ?? null
      setDomRect(domRect)
    } else {
      setDomRect(null)
    }
  }, [designer?.document, activedNode, canvasState])

  const remove = () => {
    if (activedNode?.id) {
      designer?.document?.removeNode(activedNode.id)
      if (activedNode.parentId) {
        const parentNode = designer?.document?.getNode(activedNode.parentId)
        if (parentNode?.componentName === 'Slot') {
          designer?.document?.setActivedNode(parentNode.parentId as string)
        } else {
          designer?.document?.setActivedNode(activedNode.parentId)
        }
      } else {
        designer?.document?.setActivedNode(
          designer?.document?.getRootNode()?.id as string,
        )
      }
    }
  }

  return { activedNode, domRect, remove }
}
