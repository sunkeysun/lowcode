import { useIframeCanvas } from '../hooks/useIframeCanvas'
import { useSelector } from 'react-redux'
import { documentUI } from '../store'

export function HoverRect() {
  const dragging = useSelector(documentUI.selectors.selectState)

  return (
    <div style={{
      position: 'absolute',
      top: 151.5,
      left: 8,
      width: 504,
      height: 504,
      pointerEvents: 'none',
    }}>
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          top: dragging.dragoverElement?.rect.top,
          left: dragging.dragoverElement?.rect.left,
          width: dragging.dragoverElement?.rect.width,
          height: dragging.dragoverElement?.rect.height,
        }}
      ></div>
    </div>
  )
}

export function IframeCanvas() {
  const { ref, onLoad } = useIframeCanvas()

  return (
    <>
      <HoverRect />
      <iframe
        style={{ width: 500, height: 500 }}
        ref={ref}
        src="/iframe.html"
        onLoad={onLoad}
      />
    </>
  )
}
