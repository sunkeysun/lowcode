/**
 * project entity
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '..'

export interface ProjectEntity {
  id: string
  title: string
  settings: unknown
  activeDocumentId: string | null
}

const initialState: ProjectEntity = {
  id: '',
  title: '',
  settings: {},
  activeDocumentId: null
}

export const name = 'projectUI'
const slice = createSlice({
  name,
  initialState,
  reducers: {
    setActiveDocumentId(state, action: PayloadAction<string>) {
      state.activeDocumentId = action.payload
    },
  },
})

export const reducer = slice.reducer
export const actions = slice.actions
export const selectors = {
  selectState: (state: RootState) => state.ui.projectUI,
  selectActiveDocumentId: (state: RootState) => state.ui.projectUI.activeDocumentId,
}
