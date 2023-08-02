import { useState } from 'react'
import { useComponentResources } from '../../hooks/useComponentResources'
import { useWorkbench } from '../../hooks/useWorkbench'
import { Resource } from './Resource'
import { IframeCanvas } from './IframeCanvas'
import { useDesigner } from '../../hooks/useDesigner'
import type { NodeSchema } from '../../types'

export function Workbench() {
  const { designer } = useDesigner()
  const { containerRef } = useWorkbench()
  const { resources } = useComponentResources()
  const [schema, setSchema] = useState<NodeSchema | null>()

  if (!resources) return null

  return (
    <div ref={containerRef}>
      <ul>
        {resources.map((resource, index) => (
          <Resource key={index} resource={resource} />
        ))}
      </ul>
      <div>{JSON.stringify(schema)}</div>
      <button onClick={() => setSchema(designer?.documentModel?.getSchema())}>
        获取schema
      </button>
      <IframeCanvas />
    </div>
  )
}
