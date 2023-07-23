import { useDispatch, useSelector } from 'react-redux'
import { useWorkbench } from '../hooks/useWorkbench'
import { documentEntity, documentUI, nodeEntity, projectUI } from '../store'
import { DragComponent } from './DragComponent'
import * as componentsMeta from '../materials/test/meta'
import { useEffect } from 'react'
import { uniqId } from '../common/util'

let inited = false

export function Workbench() {
  const dispatch = useDispatch()
  const { containerRef } = useWorkbench()
  const { title } = useSelector(projectUI.selectors.selectState)
  useEffect(() => {
    if (inited) return

    inited = true
    const meta = componentsMeta['Root']
    const nodeId = uniqId()
    const documentId = uniqId()
    dispatch(documentEntity.actions.addOne({
      id: documentId,
      titile: '默认页面',
      rootNodeId: nodeId,
    }))
    dispatch(documentUI.actions.changeSelectId({ id: documentId }))
    dispatch(nodeEntity.actions.appendChild({
      id: nodeId,
      titile: meta.title,
      componentName: meta.componentName,
      props: meta.variants[0].props,
      childrenIds: [],
      parentId: '',
    })) 
  }, [])

  return (
    <div ref={containerRef}>
      <input
        id="input"
        onChange={(e) =>
          dispatch(projectUI.actions.changeTitle({ title: e.target.value }))
        }
      />
      <div>{title}</div>
      <ul>
        {Object.keys(componentsMeta).map((componentName, index) =>
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
