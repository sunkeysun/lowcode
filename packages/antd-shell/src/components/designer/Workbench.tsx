import { useState } from 'react'
import { useMaterialResources, useWorkbench, useDesigner, type NodeSchema, useReady } from '@lowcode/core'
import { LCResource } from './LCResource'
import { IframeCanvas } from './IframeCanvas'
import { SettingForm } from './setting/SettingForm'

export function Workbench() {
  const { designer } = useDesigner()
  const { containerRef } = useWorkbench()
  const { resources } = useMaterialResources()
  const [schema, setSchema] = useState<NodeSchema | null>()

  return (
    <div ref={containerRef}>
      <ul>
        {resources?.map((resource, index) => (
          <LCResource key={index} resourceId={resource.id} />
        ))}
      </ul>
      <div>{JSON.stringify(schema)}</div>
      <button onClick={() => setSchema(designer?.document?.schema)}>
        获取schema
      </button>
      <IframeCanvas />
      <SettingForm />
    </div>
  )
}
