/**
 * iframeCanvas
 */
import { useEffect, useRef } from 'react'
import { useDesigner } from './useDesigner'
import { LC_DESIGNER } from '../common/constants'

export function useIframeCanvas() {
  const ref = useRef<HTMLIFrameElement>(null)
  const { designer } = useDesigner()

  useEffect(() => {
    const contentDocument = ref.current?.contentDocument
    const contentWindow = ref.current?.contentWindow  
    if (contentDocument && contentWindow && designer) {
      contentWindow[LC_DESIGNER] = designer
    }
  }, [designer])

  const onLoad = () => {
    const contentWindow = ref.current?.contentWindow
    const contentDocument = ref.current?.contentDocument
    if (contentWindow && contentDocument) {
      contentWindow[LC_DESIGNER].shell.createIframeCanvas(contentDocument)
    }
  }

  return { ref, onLoad }
}
