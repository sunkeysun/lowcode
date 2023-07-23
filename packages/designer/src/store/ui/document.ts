/**
 * document ui
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '..'

interface DraggingElement {
  info: {
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
  draggingElement: DraggingElement | null
  dragoverElement: DraggingElement | null
}

const initialState: DocumentUI = {
  selectedId: null,
  draggingElement: null,
  dragoverElement: null,
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
