import { Layout, theme } from 'antd'
import { Canvas } from '../canvas/Canvas'

export function Content() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout.Content style={{ margin: 2 }}>
      <Layout style={{ height: '100%' }}>
        <Layout.Header
          style={{ backgroundColor: colorBgContainer, height: 40 }}
        />
        <Canvas />
      </Layout>
    </Layout.Content>
  )
}
