import { Card } from 'antd'
import { CloseSquareOutlined } from '@ant-design/icons'

export function Panel({
  title,
  open,
  children,
  onClose,
}: {
  title: string
  open: boolean
  children: React.ReactNode
  onClose: () => void
}) {
  if (!open) return null
  return (
    <Card
      title={title}
      style={{ borderRadius: 0, height: '100%', width: 300 }}
      extra={<CloseSquareOutlined onClick={onClose} />}
    >
      {children}
    </Card>
  )
}
