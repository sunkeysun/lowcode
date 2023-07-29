import { useEffect, useState } from 'react'
import { Workbench } from './Workbench'
import { useDesigner } from '../../hooks/useDesigner'

export function Designer() {
  const { designer } = useDesigner()
  const [, setDocumentId] = useState<string>()

  useEffect(() => {
    if (!designer?.documentModel) {
      designer?.createDocument({
        title: '默认页面',
        componentName: 'Root',
        children: [],
        props: {},
      })
      setDocumentId(designer?.documentModel?.id)
    }
  }, [designer])

  if (!designer?.documentModel) {
    return null
  }

  return <Workbench />
}
