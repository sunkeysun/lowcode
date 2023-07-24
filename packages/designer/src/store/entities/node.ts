/**
 * nodes entity
 */
import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { type RootState } from '..'

interface NodeEntity {
  id: string
  titile: string
  componentName: string
  props: unknown
  childrenIds: string[]
  parentId: string | null
}

const adapter = createEntityAdapter<NodeEntity>()

export const name = 'node'
export const slice = createSlice({
  name,
  initialState: adapter.getInitialState(),
  reducers: {
    appendChild(state, action: PayloadAction<NodeEntity>) {
      const { payload: node } = action
      adapter.addOne(state, node)
      state.entities[node.parentId as string]?.childrenIds?.push(node.id)
    },
    remove(state, action: PayloadAction<string>) {
      const { payload: nodeId } = action
      const parentId = state.entities[nodeId]?.parentId
      if (parentId) {
        const parentNode = state.entities[parentId]
        if (parentNode) {
          const childIndex = parentNode.childrenIds.findIndex((childId) => childId === nodeId)
          parentNode.childrenIds.splice(childIndex, 1)
        }
      }
      adapter.removeOne(state, action.payload)
    },
    // insertBefore() { },
    // insertAfter() { },
  },
})

const entitySelectors = adapter.getSelectors(
  (state: RootState) => state.entities[name],
)

export const reducer = slice.reducer
export const actions = slice.actions
export const selectors = {
  selectById: (state: RootState, id: string) =>
    entitySelectors.selectById(state, id),
}
