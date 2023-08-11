import { Layout, theme } from 'antd'
import { SettingForm } from '../setting/SettingForm'
import { useActiveNode, useNodeAncestorById } from '@lowcode/core'

export function RightSider() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const { activeNode } = useActiveNode()
  const { nodeAncestor } = useNodeAncestorById(activeNode?.id as string)

  console.log(nodeAncestor, '1111111111')

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
