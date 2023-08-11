import { Card, Layout } from 'antd'
import { useIframeCanvas } from '@lowcode/core'
import { CanvasTools } from './tools/CanvasTools'

export function Canvas() {
  const { iframeRef, onLoad } = useIframeCanvas()

  return (
    <Layout style={{ position: 'relative', width: '100%', flex: 1 }}>
      <Card style={{ position: 'absolute', inset: 16, borderRadius: 0 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
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
      </Card>
    </Layout>
  )
}
