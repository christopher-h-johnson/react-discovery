import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { AppDispatch, RootState } from './rootReducer'
import { createSelector } from 'reselect'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const createAppSelector = createSelector.withTypes<RootState>()
