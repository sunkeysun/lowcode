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

export const name = 'project'
const slice = createSlice({
  name,
  initialState,
  reducers: {
    setActivedDocumentId(state, action: PayloadAction<string>) {
      state.activedDocumentId = action.payload
    },
    changeTitle(state, action: PayloadAction<{ title: string }>) {
      const { payload: { title } } = action
      state.title = title
    },
  },
})

export const reducer = slice.reducer
export const actions = slice.actions
export const selectors = {
  selectState: (state: RootState) => state.ui.project
}
