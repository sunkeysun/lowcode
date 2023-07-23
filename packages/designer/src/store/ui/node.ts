/**
 * nodes entity
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '..'

export type Dragging = {
  nodeIds: string[]
} | null

export interface NodeUI {
  selectedId: string | null
  hoverId: string | null
}

const initialState: NodeUI = {
  selectedId: null,
  hoverId: null,
}

export const name = 'node'
const slice = createSlice({
  name,
  initialState,
  reducers: {
    changeSelectId(state, action: PayloadAction<{ id: string }>) {
      const {
        payload: { id },
      } = action
      state.selectedId = id
    },
    changeHoverId(state, action: PayloadAction<{ id: string }>) {
      const {
        payload: { id },
      } = action
      state.hoverId = id
    },
  },
})

export const reducer = slice.reducer
export const actions = slice.actions
export const selectors = {
  selectState: (state: RootState) => state.ui.node,
}
