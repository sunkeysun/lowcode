/**
 * document ui
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '..'

interface DraggingTarget {
  target: {
    id: string
    type: 'component' | 'node'
  },
  rect: {
    top: number
    left: number
    width: number
    height: number
  }
}

export interface DocumentUI {
  selectedId: string | null
  draggingTarget: DraggingTarget | null
  dragoverTarget: DraggingTarget | null
}

const initialState: DocumentUI = {
  selectedId: null,
  draggingTarget: null,
  dragoverTarget: null,
}

export const name = 'document'

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
    chnageDraggingElement(state, action: PayloadAction<DraggingElement | null>) {
      const {
        payload: draggingElement,
      } = action
      state.draggingElement = draggingElement
    },
    changeDragoverElement(state, action: PayloadAction<DraggingElement | null>) {
      const {
        payload: dragoverElement,
      } = action
      state.dragoverElement = dragoverElement
    },
  },
})

export const reducer = slice.reducer
export const actions = slice.actions
export const selectors = {
  selectState: (state: RootState) => state.ui.document,
}
