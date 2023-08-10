/**
 * documents entity
 */
import { createSlice, createEntityAdapter, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '..'

export interface DocumentEntity {
  id: string
  title: string
  rootNodeId: string
  activedNodeId: string | null
}

const adapter = createEntityAdapter<DocumentEntity>({})
const initialState = adapter.getInitialState()

export const name = 'document'
const slice = createSlice({
  name,
  initialState,
  reducers: {
    addOne(state, action: PayloadAction<DocumentEntity>) {
      adapter.addOne(state, action.payload)
    },
    updateOne(state, action: PayloadAction<{ id: string, changes: Partial<DocumentEntity>}>) {
      const { payload } = action
      adapter.updateOne(state, payload)
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
