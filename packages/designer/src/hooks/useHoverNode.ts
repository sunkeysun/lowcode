import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDesigner } from './useDesigner'
import { useEffect } from 'react'

export function useHoverNode() {
  const [domRect, setDomRect] = useState<DOMRect | null>(null)
  const { designer } = useDesigner()
  const hoverNode = useSelector(() => designer!.documentModel!.getHoverTarget())
  useEffect(() => {
    if (hoverNode) {
      const nodeDom = designer?.documentModel?.getNodeDomById(hoverNode?.target.id)
      setDomRect(nodeDom?.getBoundingClientRect() as DOMRect)
    } else {
      setDomRect(null)
    }
  }, [designer?.documentModel, hoverNode])

  return { hoverNode, domRect }
}
