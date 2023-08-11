import { Layout, theme } from 'antd'

export function Header() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout.Header
      style={{
        backgroundColor: colorBgContainer,
        height: 50,
        border: '1px solid #f0f0f0',
      }}
    >
      头部
    </Layout.Header>
  )
}
