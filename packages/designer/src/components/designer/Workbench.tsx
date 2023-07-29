import { useWorkbench } from '../../hooks/useWorkbench'
import { DragComponent } from './DragComponent'
import * as componentsMeta from '../../materials/test/meta'
import { IframeCanvas } from './IframeCanvas'
import { HoverTool } from './tools/HoverTool'
import { ActivedTool } from './tools/ActivedTool'

type ComponentName = keyof typeof componentsMeta


export function Workbench() {
  const { containerRef } = useWorkbench()

  return (
    <div ref={containerRef}>
      <ul>
        {(Object.keys(componentsMeta) as ComponentName[]).map((componentName) =>
          componentsMeta[componentName].variants.map((variant, index) => (
            <DragComponent
              key={index}
              meta={{
                ...componentsMeta[componentName],
                ...variant,
                id: `${componentName}-${index}`,
              }}
            />
          )),
        )}
      </ul>
      <IframeCanvas />
      <HoverTool />
      <ActivedTool />
    </div>
  )
}
