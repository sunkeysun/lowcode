/**
 * document ui
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '..'
import { type DragOverTarget } from '../../types'
import { type NodeEntity } from '../entities/node'

export interface DocumentUI {
  hoverTarget: NodeEntity | null
  draggingTarget: NodeEntity | null
  dragoverTarget: DragOverTarget | null
}

const initialState: DocumentUI = {
  hoverTarget: null,
  draggingTarget: null,
  dragoverTarget: null,
}

export const name = 'documentUI'

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setDragingTarget(state, action: PayloadAction<NodeEntity | null>) {
      const {
        payload: draggingTarget,
      } = action
      state.draggingTarget = draggingTarget
    },
    setHoverTarget(state, action: PayloadAction<NodeEntity | null>) {
      const {
        payload: hoverTarget,
      } = action
      state.hoverTarget = hoverTarget
    },
    setDragoverTarget(state, action: PayloadAction<DragOverTarget | null>) {
      const {
        payload: dragoverTarget,
      } = action
      state.dragoverTarget = dragoverTarget
    },
  },
})

export const reducer = slice.reducer
export const actions = slice.actions
export const selectors = {
  selectState: (state: RootState) => state.ui.documentUI,
  selectDragingTarget: (state: RootState) => state.ui.documentUI.draggingTarget,
  selectDragoverTarget: (state: RootState) => state.ui.documentUI.dragoverTarget,
  selectHoverTarget: (state: RootState) => state.ui.documentUI.dragoverTarget,
}
