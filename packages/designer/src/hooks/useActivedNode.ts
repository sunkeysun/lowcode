import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDesigner } from './useDesigner'
import { useEffect } from 'react'

export function useActivedNode() {
  const [domRect, setDomRect] = useState<DOMRect | null>(null)
  const { designer } = useDesigner()
  const activedNode = useSelector(() => designer!.documentModel!.getActivedNode())
  useEffect(() => {
    if (activedNode) {
      const nodeDom = designer?.documentModel?.getNodeDomById(activedNode.id)
      console.log(activedNode, nodeDom, '11111111')
      setDomRect(nodeDom?.getBoundingClientRect() as DOMRect)
    } else {
      setDomRect(null)
    }
  }, [designer?.documentModel, activedNode])

  return { activedNode, domRect }
}
