import { useIframeCanvas } from '../../hooks/useIframeCanvas'
import { CanvasTools } from './tools/CanvasTools'

export function IframeCanvas() {
  const { iframeRef, onLoad } = useIframeCanvas()

  return (
    <div
      style={{
        position: 'fixed',
        top: 200,
        left: 200,
        width: 500,
        height: 500,
        border: '1px solid',
      }}
    >
      <iframe
        id="iframe"
        style={{
          position: 'absolute',
          border: 0,
          width: '100%',
          height: '100%',
        }}
        ref={iframeRef}
        src="/iframe.html"
        onLoad={onLoad}
      />
      <CanvasTools />
    </div>
  )
}
