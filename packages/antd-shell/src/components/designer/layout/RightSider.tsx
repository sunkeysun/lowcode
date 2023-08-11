import { Layout } from 'antd'
import { SettingForm } from '../setting/SettingForm'

export function RightSider() {
  return (
    <Layout.Sider theme='light' width={320}>
      <SettingForm />
    </Layout.Sider>
  )
}
