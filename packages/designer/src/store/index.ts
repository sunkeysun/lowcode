/**
 * store
 */
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import * as documentEntity from './entities/document'
import * as nodeEntity from './entities/node'
import * as resourceEntity from './entities/resource'
import * as documentUI from './ui/document'
import * as projectUI from './ui/project'

export const store = configureStore({
  reducer: {
    entities: combineReducers({
      [documentEntity.name]: documentEntity.reducer,
      [nodeEntity.slice.name]: nodeEntity.slice.reducer,
      [resourceEntity.slice.name]: resourceEntity.slice.reducer,
    }),
    ui: combineReducers({
      [documentUI.name]: documentUI.reducer,
      [projectUI.name]: projectUI.reducer,
    }),
  },
})

export type RootState = ReturnType<typeof store.getState>
export type StoreType = typeof store

export { documentEntity, nodeEntity, resourceEntity, documentUI, projectUI }
