import { useEffect, useState } from 'react'
import { Workbench } from './Workbench'
import { useDesigner } from '../../hooks/useDesigner'
import * as componentMap from '../../materials/test'
import * as componentMatasMap from '../../materials/test/meta'
import { Root } from '../rootMaterials/root'
import { Root as RootMeta } from '../rootMaterials/root/meta'

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
      designer?.materialManager.register({...componentMap, Root }, { ...componentMatasMap, Root: RootMeta })
    }
  }, [designer])

  if (!designer?.documentModel) {
    return null
  }

  return <Workbench />
}
