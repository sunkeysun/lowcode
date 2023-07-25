/**
 * nodes entity
 */
import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { type RootState } from '..'

export interface NodeEntity {
  id: string
  title: string
  componentName: string
  props: unknown
  childrenIds: string[]
  parentId: string | null
  documentId: string
}

const adapter = createEntityAdapter<NodeEntity>()

export const name = 'node'
export const slice = createSlice({
  name,
  initialState: adapter.getInitialState(),
  reducers: {
    addOne: adapter.addOne.bind(this),
    updateOne: adapter.updateOne.bind(this),
    removeOne(state, action: PayloadAction<string>) {
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
