import { ReducerBuilder, reducerWithInitialState } from 'typescript-fsa-reducers'
import { IIIIF } from '../'
import { setCurrentManifestCollection, setInApolloRequest } from '../actions'

export const iiif = (initialState): ReducerBuilder<IIIIF> => reducerWithInitialState(initialState)
  .case(setCurrentManifestCollection, (state, { collection }): ReducerBuilder<IIIIF> => ({
    ...state,
    collection
  }))
  .case(setInApolloRequest, (state, { uuid }): ReducerBuilder<IIIIF> => ({
    ...state,
    apollo: [uuid, ...state.apollo]
  }))
