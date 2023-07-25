/**
 * store
 */
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import * as documentEntity from './entities/document'
import * as nodeEntity from './entities/node'
import * as materialEntity from './entities/material'
import * as componentEntity from './entities/component'
import * as documentUI from './ui/document'
import * as nodeUI from './ui/node'
import * as projectUI from './ui/project'

export const store = configureStore({
  reducer: {
    entities: combineReducers({
      [documentEntity.name]: documentEntity.reducer,
      [nodeEntity.slice.name]: nodeEntity.slice.reducer,
      [materialEntity.slice.name]: materialEntity.slice.reducer,
      [componentEntity.slice.name]: componentEntity.slice.reducer,
    }),
    ui: combineReducers({
      [documentUI.name]: documentUI.reducer,
      [nodeUI.name]: nodeUI.reducer,
      [projectUI.name]: projectUI.reducer,
    }),
  },
})

export type RootState = ReturnType<typeof store.getState>
export type StoreType = typeof store

export { documentEntity, nodeEntity, documentUI, nodeUI, projectUI }
