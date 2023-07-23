/**
 * documents entity
 */
import { createSlice, createEntityAdapter, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '..'

interface DocumentEntity {
  id: string
  titile: string
  rootNodeId: string
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
