/**
 * document ui
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '..'
import { type HoverTarget, type DragoverTarget } from '../../types'
import { type NodeEntity } from '../entities/node'

export interface DocumentUI {
  hoverTarget: HoverTarget | null
  draggingTarget: NodeEntity | null
  dragoverTarget: DragoverTarget | null
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
      const { payload: draggingTarget } = action
      state.draggingTarget = draggingTarget
    },
    setHoverTarget(state, action: PayloadAction<HoverTarget | null>) {
      const { payload: hoverTarget } = action
      state.hoverTarget = hoverTarget
    },
    setDragoverTarget(state, action: PayloadAction<DragoverTarget | null>) {
      const { payload: dragoverTarget } = action
      state.dragoverTarget = dragoverTarget
    },
  },
})

export const reducer = slice.reducer
export const actions = slice.actions
export const selectors = {
  selectState: (state: RootState) => state.ui.documentUI,
  selectDragingTarget: (state: RootState) => state.ui.documentUI.draggingTarget,
  selectDragoverTarget: (state: RootState) =>
    state.ui.documentUI.dragoverTarget,
  selectHoverTarget: (state: RootState) => state.ui.documentUI.hoverTarget,
}
