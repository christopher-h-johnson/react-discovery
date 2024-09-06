import { ESCore, IElasticSearchQuery } from '@react-discovery/core'
import { IConfig, config } from '@react-discovery/configuration'
import { Reducer } from 'redux'
import { iiif } from '@react-discovery/iiif'
import { localConfig } from '../config'
import { workspace } from '@react-discovery/workspace'
import { configureStore } from '@reduxjs/toolkit'
const { collections, currentCollection } = localConfig

if (!(currentCollection in collections)) {
  throw new Error('current collection does not exist in collections configuration')
}

const initialWorkspaceState = {
  layout: {
    direction: 'row',
    first: '3809155f-56dc-4c6d-a097-4850bcb7e1d9',
    second: '5c3a9c1d-263d-48d7-9739-34e2df12f125',
    splitPercentage: 50
  },
  viewIdMap: {}
}

const initialIIIFState = {

}
const iiifReducer = iiif(initialIIIFState)
const workspaceReducer = workspace(initialWorkspaceState)
const initialConfigState: IConfig = localConfig
const configReducer: Reducer = config(initialConfigState)
const initialQueryState: IElasticSearchQuery = {
  aggs: {},
  filters: {},
  from: 0,
  searchFields: [],
  size: 20,
  sortFields: [],
  stringInput: ''
}

const queryReducer: Reducer = ESCore.state.query(initialQueryState)

export const store: any = configureStore({
  reducer: {
    config: configReducer,
    iiif: iiifReducer,
    query: queryReducer,
    response: ESCore.state.response,
    workspace: workspaceReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
