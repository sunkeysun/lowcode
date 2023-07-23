/**
 * 物料实体
 */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

interface MaterialEntity {
  id: string
  titile: string
}

const adapter = createEntityAdapter<MaterialEntity>({})
const initialState = adapter.getInitialState()

export const name = 'material'
export const slice = createSlice({
  name,
  initialState,
  reducers: {},
})

export const reducer = slice.reducer
export const actions = slice.actions
export const selectors = {}
