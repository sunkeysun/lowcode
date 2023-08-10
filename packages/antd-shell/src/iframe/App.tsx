import { useEffect } from 'react'
import { ComponentTree } from './ComponentTree'
import { LC_DESIGNER, DesignerProvider, Designer, useReady } from '@lowcode/core'
import * as componentMap from '../materials/test'
import * as componentMatasMap from '../materials/test/meta'
import { Root } from '../components/rootMaterials/root'
import { Root as RootMeta } from '../components/rootMaterials/root/meta'
import { Slot } from '../components/rootMaterials/slot'
import { Slot as SlotMeta } from '../components/rootMaterials/slot/meta'

export function App() {
  const designer = window[LC_DESIGNER] as Designer

  useEffect(() => {
    if (designer) {
      designer?.material.register(
        { ...componentMap, Root, Slot },
        { ...componentMatasMap, Root: RootMeta, Slot: SlotMeta },
      )
    }
  }, [designer])

  return (
    <DesignerProvider designer={designer}>
      <div style={{ padding: 20 }}>
        <ComponentTree />
      </div>
    </DesignerProvider>
  )
}
