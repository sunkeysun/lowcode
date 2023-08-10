import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDesigner } from './useDesigner'
import { useEffect } from 'react'
import { useCanvasState } from './useCanvasState'

export function useActiveNode() {
  const [domRect, setDomRect] = useState<DOMRect | null>(null)
  const { designer } = useDesigner()
  const { canvasState } = useCanvasState()
  const activeNode = useSelector(() => designer!.document!.activeNode)
  useEffect(() => {
    if (activeNode && canvasState) {
      const nodeDom = designer?.document?.getNodeDomById(activeNode.id)
      const domRect = nodeDom?.getBoundingClientRect() ?? null
      setDomRect(domRect)
    } else {
      setDomRect(null)
    }
  }, [designer?.document, activeNode, canvasState])

  const remove = () => {
    if (activeNode?.id) {
      designer?.document?.removeNode(activeNode.id)
      if (activeNode.parentId) {
        const parentNode = designer?.document?.getNodeById(activeNode.parentId)
        if (parentNode?.componentName === 'Slot') {
          designer?.document?.setActivedNode(parentNode.parentId as string)
        } else {
          designer?.document?.setActivedNode(activeNode.parentId)
        }
      } else {
        designer?.document?.setActivedNode(
          designer?.document?.rootNode?.id as string,
        )
      }
    }
  }

  return { activeNode, domRect, remove }
}
