import { Card } from 'antd'
import { CloseSquareOutlined } from '@ant-design/icons'
import { CSSProperties } from 'react'

export function Panel({
  title,
  open,
  style = {},
  children,
  onClose,
}: {
  title: string
  open: boolean
  style?: CSSProperties
  children: React.ReactNode
  onClose: () => void
}) {
  if (!open) return null
  return (
    <Card
      title={title}
      style={{ borderRadius: 0, height: '100%', width: 266 }}
      bodyStyle={{ padding: '10px 4px', ...style }}
      extra={<CloseSquareOutlined onClick={onClose} />}
    >
      {children}
    </Card>
  )
}
