/**
 * iframeCanvas
 */
import { useEffect, useRef, useState } from 'react'
import { useDesigner } from './useDesigner'
import { LC_DESIGNER } from '../common/constants'

export function useIframeCanvas() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { designer } = useDesigner()
  const [domRect, setDomRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    const contentDocument = iframeRef.current?.contentDocument
    const contentWindow = iframeRef.current?.contentWindow
    if (contentDocument && contentWindow && designer) {
      contentWindow[LC_DESIGNER] = designer
    }
  }, [designer])

  const onLoad = () => {
    const contentWindow = iframeRef.current?.contentWindow
    const contentDocument = iframeRef.current?.contentDocument
    if (contentWindow && contentDocument) {
      contentWindow[LC_DESIGNER].shellManager.createIframeCanvas(iframeRef.current)
    }
    const domRect = iframeRef.current?.getBoundingClientRect() ?? null
    setDomRect(domRect)

    contentWindow?.addEventListener('resize', () => {
      const domRect = iframeRef.current?.getBoundingClientRect() ?? null
      setDomRect(domRect)
    })
  }

  return { iframeRef, onLoad, domRect }
}
