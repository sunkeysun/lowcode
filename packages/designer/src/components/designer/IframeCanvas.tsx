import { useIframeCanvas } from '../../hooks/useIframeCanvas'
import { CanvasTools } from './tools/CanvasTools'

export function IframeCanvas() {
  const { iframeRef, onLoad } = useIframeCanvas()

  return (
    <>
      <iframe
        style={{ width: 500, height: 500, border: '1px solid' }}
        ref={iframeRef}
        src="/iframe.html"
        onLoad={onLoad}
      />
      <CanvasTools />
    </>
  )
}
