import { useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { ResourcePanel } from '../panels/ResourcePanel'
import { OutlinePanel } from '../panels/OutlinePanel'

export function LeftSider() {
  const [activePanel, setActivePanel] = useState<string>('resource')
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout.Sider
      theme="light"
      collapsible
      trigger={null}
      width={348}
      collapsed={!activePanel}
    >
      <Layout style={{ flexDirection: 'row', height: '100%' }}>
        <Layout
          style={{ width: 48, flex: 'none', backgroundColor: colorBgContainer }}
        >
          <Menu
            mode="inline"
            selectedKeys={[activePanel]}
            multiple={true}
            onClick={({ key }) =>
              key === activePanel ? setActivePanel('') : setActivePanel(key)
            }
            items={[
              {
                key: 'resource',
                icon: <UserOutlined />,
                label: '资源面板',
              },
              {
                key: 'outline',
                icon: <VideoCameraOutlined />,
                label: '大纲面板',
              },
            ]}
          />
        </Layout>
        <Layout style={{ position: 'relative', overflow: 'hidden' }}>
          <ResourcePanel
            open={activePanel === 'resource'}
            onClose={() => setActivePanel('')}
          />
          <OutlinePanel
            open={activePanel === 'outline'}
            onClose={() => setActivePanel('')}
          />
        </Layout>
      </Layout>
    </Layout.Sider>
  )
}
