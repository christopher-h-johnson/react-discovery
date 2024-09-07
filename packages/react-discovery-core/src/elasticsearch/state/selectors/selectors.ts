import { IAggRecord, IElasticSearchQuery, ISearchFunctionRandomQuery } from '../../index'
import { IAggregation, IFilters, IHit, IHits, IState } from '../../..'
import { ISearchField, ISortField } from '@react-discovery/configuration'
import { FieldConstants } from '../../enum'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const typeField = FieldConstants.TYPE_FIELD

export const getAggs = (): IAggRecord => {
  return useSelector((state: any): any => state.query.aggs)
}

export const getAggregation = (field): IAggregation => {
  return useSelector((state: IState): IAggregation =>
    state.response && state.response.aggregations && state.response.aggregations[field])
}

export const getDocuments = (): IHits => {
  return useSelector((state: any): IHits => state.response.docs)
}

export const getFilters = (): IFilters => {
  return useSelector((state: IState): IFilters => state.query.filters)
}

export const getFiltersForField = (field): string[] => {
  return useSelector((state: IState): string[] => state.query.filters[field])
}

export const getFilterType = (): string => {
  return useSelector((state: IState): string => state.query.filters && state.query.filters[typeField] &&
    state.query.filters[typeField][0])
}

export const getHits = (): IHits => {
  return useSelector((state: any): IHits => state.response.hits)
}

export const selectHitForId = createSelector([(state) => state.response.hits && state.response.hits.hits, (_state, id) => id],
  (hits, id) => hits.filter((hit) => hit.id === id)[0])

export const getHitForId = (id): IHit => {
  return useSelector((state: any): IHit => selectHitForId(state, id))
}

export const selectHitIndexForId = createSelector([(state) => state.response.hits && state.response.hits.hits, (_state, id) => id],
  (hits, id) => hits.findIndex((hit) => hit.id === id))

export const getHitIndexForId = (id): number => {
  return useSelector((state: any): number => selectHitIndexForId(state, id))
}

export const selectHitForIndex = createSelector([(state: any) => state.response.hits && state.response.hits.hits, (_state, index) => index],
  // eslint-disable-next-line no-empty-pattern
  (hits, index) => hits.filter(({}, i): boolean => i === index)[0])

export const getHitForIndex = (index): IHit => {
  return useSelector((state: any): IHit => selectHitForIndex(state, index))
}

export const getNumFound = (): number => {
  return useSelector((state: any): number => state.response.hits && state.response.hits.numFound)
}

export const getSearchFields = (): ISearchField[] => {
  return useSelector((state: any): ISearchField[] => state.query && state.query.searchFields)
}

export const getSize = (): number => {
  return useSelector((state: any): number => state.query.size)
}

export const getSortFields = (): ISortField[] => {
  return useSelector((state: any): ISortField[] => state.query.sortFields)
}

export const getFrom = (): number => {
  return useSelector((state: any): number => state.query.from)
}

export const getStringInput = (): string => {
  return useSelector((state: any): string => state.query.stringInput)
}

export const getDefaultQuery = (): IElasticSearchQuery => {
  const aggs = getAggs()
  const filters = getFilters()
  const from = getFrom()
  const stringInput = getStringInput()
  const searchFields = getSearchFields()
  const size = getSize()
  const sortFields = getSortFields()
  return {
    aggs,
    filters,
    from,
    searchFields,
    size,
    sortFields,
    stringInput
  }
}

export const getFunctionRandomQuery = (): ISearchFunctionRandomQuery => {
  const aggs = getAggs()
  const filters = getFilters()
  const from = getFrom()
  const stringInput = getStringInput()
  const searchFields = getSearchFields()
  const size = getSize()
  const sortFields = getSortFields()
  return {
    aggs,
    filters,
    from,
    searchFields,
    size,
    sortFields,
    stringInput
  }
}
