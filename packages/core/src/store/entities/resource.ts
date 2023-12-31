/**
 * 物料资源
 */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { RootState } from '..'
import type { NodeSchema, ComponentSnippet } from '../../types'

export interface ResourceEntity extends ComponentSnippet {
  id: string
  title: string
  screenshot?: string;
  schema: NodeSchema
}

const adapter = createEntityAdapter<ResourceEntity>({})
const initialState = adapter.getInitialState()

export const name = 'resource'
const slice = createSlice({
  name,
  initialState,
  reducers: {
    setAll: adapter.setAll.bind(adapter),
    removeAll: adapter.removeAll.bind(adapter),
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
  selectAll: (state: RootState) => entitySelectors.selectAll(state),
}
