import {
  useActiveNode,
  useMaterialBehaviorByName,
  useNodeAncestorById,
} from '@lowcode/core'
import { Button, Dropdown, type ButtonProps } from 'antd'
import { DeleteOutlined, CopyOutlined } from '@ant-design/icons'

export interface ActionItemProps {
  title?: string
  type?: ButtonProps['type']
  icon?: React.ReactNode
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onFocus?: () => void
}

function ActionItem({
  title = '',
  type = 'primary',
  icon,
  onClick,
}: ActionItemProps) {
  return (
    <Button
      type={type}
      title={title}
      style={{
        width: 20,
        height: 20,
        borderRadius: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      icon={icon}
      onClick={onClick}
    />
  )
}

function DropdownItem({
  title = '',
  type = 'primary',
  icon,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
}: ActionItemProps) {
  return (
    <Button
      type={type}
      icon={icon}
      style={{
        height: 20,
        borderRadius: 3,
        marginRight: 2,
        fontSize: 12,
        padding: '4px 10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
    >
      {title}
    </Button>
  )
}

export function ActiveTool() {
  const { activeNode, domRect, removeActiveNode, setActiveNode } =
    useActiveNode()
  const { behavior } = useMaterialBehaviorByName(
    activeNode?.componentName as string,
  )
  const { nodeAncestor } = useNodeAncestorById(activeNode?.id as string)

  if (!domRect || !activeNode) return null

  const { top, left, width, height } = domRect

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        width,
        height,
        border: '2px solid #197aff',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -23,
          right: 0,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <div style={{ pointerEvents: 'all', display: 'flex' }}>
          {nodeAncestor.length > 0 && (
            <Dropdown
              dropdownRender={() => (
                <>
                  {nodeAncestor?.map((node, index) => (
                    <DropdownItem
                      key={index}
                      title={node?.title}
                      onClick={() => setActiveNode(node?.id as string)}
                    />
                  ))}
                </>
              )}
              placement="bottom"
              destroyPopupOnHide={true}
            >
              <DropdownItem title={activeNode.title} />
            </Dropdown>
          )}
          {behavior?.canCopy() && (
            <ActionItem
              title="复制"
              icon={<CopyOutlined />}
              onClick={() => removeActiveNode()}
            />
          )}
          {behavior?.canRemove() && (
            <ActionItem
              title="删除"
              icon={<DeleteOutlined />}
              onClick={() => removeActiveNode()}
            />
          )}
        </div>
      </div>
    </div>
  )
}
