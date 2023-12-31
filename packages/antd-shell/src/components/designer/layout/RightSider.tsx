import { Layout, theme } from 'antd'
import { SettingForm } from '../setting/SettingForm'

export function RightSider() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout.Sider theme="light" width={320}>
      <Layout.Header
        style={{
          backgroundColor: colorBgContainer,
          height: 42,
          borderBottom: '1px solid #f0f0f0',
        }}
      />
      <SettingForm />
    </Layout.Sider>
  )
}
