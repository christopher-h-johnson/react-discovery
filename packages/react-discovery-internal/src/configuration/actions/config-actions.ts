import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

const SET_CURRENT_LANGUAGE = 'SET_CURRENT_LANGUAGE'
const SET_IS_PERSISTED = 'SET_IS_PERSISTED'
const SET_CURRENT_HIT_COMPONENT = 'SET_CURRENT_HIT_COMPONENT'
const SET_SELECTED_INDEX = 'SET_SELECTED_INDEX'
const SET_VIEW_TYPE = 'SET_VIEW_TYPE'
const SET_ITEM_VIEW_TYPE = 'SET_ITEM_VIEW_TYPE'
const SET_CURRENT_COLLECTION = 'SET_CURRENT_COLLECTION'
const SET_CURRENT_SELECTED_TAB = 'SET_CURRENT_SELECTED_TAB'
const SET_REFINEMENT_LIST_FILTER_SIZE = 'SET_REFINEMENT_LIST_FILTER_SIZE'
const SET_CURRENT_GRID_VIEWER_OBJECT = 'SET_CURRENT_GRID_VIEWER_OBJECT'
const SET_IS_SORTED = 'SET_IS_SORTED'

export const setSelectedIndex = actionCreator<{selectedIndex: number}>(SET_SELECTED_INDEX)
export const setCurrentLanguage = actionCreator<{currentLanguage: string}>(SET_CURRENT_LANGUAGE)
export const setIsPersisted = actionCreator<{isPersisted: boolean}>(SET_IS_PERSISTED)
export const setCurrentHitComponent = actionCreator<{currentHitComponent: string}>(SET_CURRENT_HIT_COMPONENT)
export const setViewType = actionCreator<{viewType: string}>(SET_VIEW_TYPE)
export const setItemViewType = actionCreator<{id: string; itemViewType: string}>(SET_ITEM_VIEW_TYPE)
export const setCurrentCollection = actionCreator<{currentCollection: string}>(SET_CURRENT_COLLECTION)
export const setCurrentSelectedTab = actionCreator<{currentSelectedTab: number; id: string}>(SET_CURRENT_SELECTED_TAB)
export const setRefinementListFilterSize = actionCreator<{currentCollection: string; filterName: string; size: number}>(SET_REFINEMENT_LIST_FILTER_SIZE)
export const setCurrentGridViewerObject = actionCreator<{gridViewerObject: {id, index, thumbnail}}>(SET_CURRENT_GRID_VIEWER_OBJECT)
export const setIsSorted = actionCreator<{isSorted: boolean}>(SET_IS_SORTED)
