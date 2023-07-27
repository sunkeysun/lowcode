import { useIframeCanvas } from '../hooks/useIframeCanvas'

export function IframeCanvas() {
  const { ref, onLoad } = useIframeCanvas()

  return (
    <>
      <iframe
        style={{ width: 500, height: 500 }}
        ref={ref}
        src="/iframe.html"
        onLoad={onLoad}
      />
    </>
  )
}
