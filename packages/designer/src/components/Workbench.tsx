import { useWorkbench } from '../hooks/useWorkbench'
import { DragComponent } from './DragComponent'
import * as componentsMeta from '../materials/test/meta'
import { useEffect } from 'react'
import { useDesigner } from '../hooks/useDesigner'
import { useActivedDocument } from '../hooks/useActivedDocument'

let inited = false

export function Workbench() {
  const { designer } = useDesigner()
  const { ref } = useWorkbench()
  const { document } = useActivedDocument()
  useEffect(() => {
    if (inited) return

    inited = true
    designer?.createDocument({
      title: '默认页面',
      componentName: 'Root',
      children: [],
      props: {},
    })
  }, [designer])

  return (
    <div ref={ref}>
      <input type="text" onChange={(e) => designer?.documentModel?.setTitle(e.target.value)} />
      <span>{document?.title}</span>
      <ul>
        {Object.keys(componentsMeta).map((componentName) =>
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
    </div>
  )
}
