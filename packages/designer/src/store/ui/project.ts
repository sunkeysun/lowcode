/**
 * project entity
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '..'

export interface HistoryItem {}

export interface Settings {}

export interface ProjectEntity {
  id: string
  title: string,
  settings: {}
}

const initialState: ProjectEntity = {
  id: '',
  title: '',
  settings: {},
}

export const name = 'project'
const slice = createSlice({
  name,
  initialState,
  reducers: {
    changeSettings(state, action: PayloadAction<Settings>) {
      const { payload: settings } = action
      Object.assign(state.settings, settings)
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
