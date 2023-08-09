import { useState } from 'react'
import { useMaterialResources } from '../../hooks/useMaterialResources'
import { useWorkbench } from '../../hooks/useWorkbench'
import { ResourceComponent } from './ResourceComponent'
import { IframeCanvas } from './IframeCanvas'
import { useDesigner } from '../../hooks/useDesigner'
import type { NodeSchema } from '../../types'
import { SettingForm } from './setting/SettingForm'

export function Workbench() {
  const { designer } = useDesigner()
  const { containerRef } = useWorkbench()
  const { resources } = useMaterialResources()
  const [schema, setSchema] = useState<NodeSchema | null>()

  if (!resources) return null

  return (
    <div ref={containerRef}>
      <ul>
        {resources.map((resource, index) => (
          <ResourceComponent key={index} resource={resource} />
        ))}
      </ul>
      <div>{JSON.stringify(schema)}</div>
      <button onClick={() => setSchema(designer?.document?.getSchema())}>
        获取schema
      </button>
      <IframeCanvas />
      <SettingForm />
    </div>
  )
}
