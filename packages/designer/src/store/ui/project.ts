/**
 * project entity
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '..'

export interface ProjectEntity {
  id: string
  title: string
  settings: unknown
  activedDocumentId: string | null
}

const initialState: ProjectEntity = {
  id: '',
  title: '',
  settings: {},
  activedDocumentId: null
}

export const name = 'projectUI'
const slice = createSlice({
  name,
  initialState,
  reducers: {
    setActivedDocumentId(state, action: PayloadAction<string>) {
      state.activedDocumentId = action.payload
    },
  },
})

export const reducer = slice.reducer
export const actions = slice.actions
export const selectors = {
  selectState: (state: RootState) => state.ui.project,
  selectActivedDocumentId: (state: RootState) => state.ui.project.activedDocumentId,
}
