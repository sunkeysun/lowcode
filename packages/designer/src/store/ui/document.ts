/**
 * document ui
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '..'
import { type HoverTarget, type DragoverTarget, type CanvasState } from '../../types'
import { type NodeEntity } from '../entities/node'

export interface DocumentUI {
  hoverTarget: HoverTarget | null
  draggingTarget: NodeEntity | null
  dragoverTarget: DragoverTarget | null
  canvasState: CanvasState | null
}


const initialState: DocumentUI = {
  hoverTarget: null,
  draggingTarget: null,
  dragoverTarget: null,
  canvasState: null,
}

export const name = 'documentUI'
const slice = createSlice({
  name,
  initialState,
  reducers: {
    setDragingTarget(state, { payload: draggingTarget }: PayloadAction<NodeEntity | null>) {
      state.draggingTarget = draggingTarget
    },
    setHoverTarget(state, { payload: hoverTarget }: PayloadAction<HoverTarget | null>) {
      state.hoverTarget = hoverTarget
    },
    setDragoverTarget(state, { payload: dragoverTarget }: PayloadAction<DragoverTarget | null>) {
      state.dragoverTarget = dragoverTarget
    },
    setCanvasState(state, { payload: canvasState }: PayloadAction<CanvasState>) {
      state.canvasState = canvasState
    }
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
  selectCanvasState: (state: RootState) => state.ui.documentUI.canvasState,
}
