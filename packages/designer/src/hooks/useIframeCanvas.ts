/**
 * iframeCanvas
 */
import { useEffect, useRef } from 'react'
import { useDesigner } from './useDesigner'
import { LC_DESIGNER } from '../common/constants'

export function useIframeCanvas() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { designer } = useDesigner()

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
      contentWindow[LC_DESIGNER].shell.createIframeCanvas(contentDocument)
    }
  }

  return { iframeRef, onLoad }
}
