import { useIframeCanvas } from '../../hooks/useIframeCanvas'

export function IframeCanvas() {
  const { iframeRef, onLoad, domRect } = useIframeCanvas()
  console.log(domRect, '999999999')

  return (
    <>
      <iframe
        style={{ width: 500, height: 500 }}
        ref={iframeRef}
        src="/iframe.html"
        onLoad={onLoad}
      />
    </>
  )
}
