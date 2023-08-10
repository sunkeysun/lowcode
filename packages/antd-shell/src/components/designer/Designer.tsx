import { useEffect, useState } from 'react'
import { useDesigner, useReady } from '@lowcode/core'
import { Workbench } from './Workbench'
import { Spin } from 'antd'

export function Designer() {
  const { designer } = useDesigner()
  const [, setDocumentId] = useState<string>()
  const { isReady } = useReady()

  useEffect(() => {
    if (!designer?.document) {
      designer?.createDocument({
        title: '默认页面',
        componentName: 'Root',
        children: [],
        props: {},
      })
      setDocumentId(designer?.document?.id)
    }
  }, [designer])

  if (!designer?.document) return null

  return (
    <Spin spinning={!isReady}>
      <Workbench />
    </Spin>
  )
}
