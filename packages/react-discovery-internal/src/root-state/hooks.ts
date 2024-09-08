import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { AppDispatch, RootState } from './rootReducer'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const createAppSelector = createSelector.withTypes<RootState>()
