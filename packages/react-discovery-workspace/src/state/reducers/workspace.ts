import { ReducerBuilder, reducerWithInitialState } from 'typescript-fsa-reducers'
import { removeViewId, setViewIdMap, setWorkspaceLayout } from '../actions'
import { MosaicParent } from 'react-mosaic-component'
import { omit } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
interface IWorkspace {
  layout: MosaicParent<string>;
  viewIdMap: Record<string, string>;
}

export const workspace = (initialState): ReducerBuilder<IWorkspace> => reducerWithInitialState(initialState)
  .case(setWorkspaceLayout, (state, { layout }): ReducerBuilder<IWorkspace> => ({
    ...state,
    layout
  }))
  .case(setViewIdMap, (state, { id, manifest, type }): ReducerBuilder<IWorkspace> => ({
    ...state,
    viewIdMap: {
      ...state.viewIdMap,
      [uuidv4()]: {
        id,
        manifest,
        type
      }
    }
  }))
  .case(removeViewId, (state, { id }): ReducerBuilder<IWorkspace> => ({
    ...state,
    viewIdMap: omit(state.viewIdMap, id)
  }))
