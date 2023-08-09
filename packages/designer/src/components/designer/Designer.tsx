import { useEffect, useState } from 'react'
import { Workbench } from './Workbench'
import { useDesigner } from '../../hooks/useDesigner'
import * as componentMap from '../../materials/test'
import * as componentMatasMap from '../../materials/test/meta'
import { Root } from '../rootMaterials/root'
import { Root as RootMeta } from '../rootMaterials/root/meta'
import { Slot } from '../rootMaterials/slot'
import { Slot as SlotMeta } from '../rootMaterials/slot/meta'

export function Designer() {
  const { designer } = useDesigner()
  const [, setDocumentId] = useState<string>()

  useEffect(() => {
    if (!designer?.document) {
      designer?.createDocument({
        title: '默认页面',
        componentName: 'Root',
        children: [],
        props: {},
      })
      setDocumentId(designer?.document?.id)
      designer?.material.register(
        { ...componentMap, Root, Slot },
        { ...componentMatasMap, Root: RootMeta, Slot: SlotMeta },
      )
    }
  }, [designer])

  if (!designer?.document) {
    return null
  }

  return <Workbench />
}
