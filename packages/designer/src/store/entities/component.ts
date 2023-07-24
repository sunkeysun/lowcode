/**
 * 组件实体
 */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

interface ComponentEntity {
  id: string
  titile: string
  componentName: string
  propsSetter: unknown[]
  variants: {
    title: string
    thumbnail: string
    schema: {
      componentName: string
      props: Record<string, unknown>
    }
  }[]
}

const adapter = createEntityAdapter<ComponentEntity>({})
const initialState = adapter.getInitialState()

export const name = 'component'
export const slice = createSlice({
  name,
  initialState,
  reducers: {},
})

export const reducer = slice.reducer
export const actions = slice.actions
export const selectors = {}

