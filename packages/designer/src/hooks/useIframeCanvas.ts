/**
 * iframeCanvas
 */
import { useEffect, useRef } from 'react'
import { useDesigner } from './useDesigner'

export function useIframeCanvas() {
  const ref = useRef<HTMLIFrameElement>(null)
  const designer = useDesigner()

  useEffect(() => {
    const contentDocument = ref.current?.contentDocument
    const contentWindow = ref.current?.contentWindow
    if (contentDocument && contentWindow && designer) {
      ;(contentWindow as any).designer = designer
    }
  }, [])

  const onLoad = () => {
    const contentWindow = ref.current?.contentWindow
    const contentDocument = ref.current?.contentDocument
    contentWindow.designer.shell.createIframeCanvas(contentDocument)
  }

  return { ref, onLoad }
}
