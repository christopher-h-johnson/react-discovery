import React, { ReactElement, useEffect, useState } from 'react'
import { buildAggs, functionQueryBuilder, queryBuilder } from '../query-builders'
import {
  fetchElasticSearchResponse,
  getDefaultQuery,
  getFrom,
  getFunctionRandomQuery,
  getSize,
  getStringInput,
  setQueryFields
} from '../state'
import { getCollections, getCurrentCollection, getCurrentSearchContext, setCurrentCollection, setSelectedIndex } from '@react-discovery/configuration'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { ElasticSearchConstants } from '../enum'
import { IElasticSearchQuery, ISearchFunctionRandomQuery } from '../index'
import { useAppDispatch, usePrevious } from '@react-discovery/elasticsearch-app'
import { stringify } from 'query-string'

interface IElasticSearchProvider {
  useHistory?: boolean;
  children?: React.ReactNode;
}

export const ElasticSearchProvider: React.FC<IElasticSearchProvider> = (props): ReactElement => {
  const [isInitialized, setIsInitialized] = useState(false)
  const { useHistory } = props
  const from = getFrom()
  const size = getSize()
  const navigate = useNavigate()
  const route = useLocation()
  const [params] = useSearchParams()
  const pathname = route.pathname
  const stringInput = getStringInput()
  // const query: IElasticSearchQuery = getDefaultQuery()
  // const queryObj = queryBuilder(query)
  const randomQuery = getFunctionRandomQuery()
  const randomQueryObj = functionQueryBuilder(randomQuery)
  const json = JSON.stringify(randomQueryObj)
  // const json = JSON.stringify(queryObj)
  const prevJson = usePrevious(json)
  const collections = getCollections()
  const currentCollection = getCurrentCollection()
  const currentSearchContext = getCurrentSearchContext()
  const dispatch = useAppDispatch()

  const fetchResponse = (url): boolean => {
    dispatch(fetchElasticSearchResponse.action({ json, url }))
    return true
  }

  const initSearchFromRoute = (): string => {
    const urlStart = params.get('start') ? Number.parseInt(params.get('start')) : 0
    const currentPage = urlStart ? urlStart / size : 0
    const pathnameParts = route.pathname.split('/')
    const q = params.get('q') || pathnameParts[3]
    const urlCollection = pathnameParts[2] || process.env.REACT_APP_SEARCH_API_COLLECTION
    urlCollection && dispatch(setCurrentCollection({ currentCollection: urlCollection }))
    const url = process.env.REACT_APP_SEARCH_API_HOST + urlCollection + ElasticSearchConstants.SEARCH
    const { initialFilter, refinementListFilters, searchFields, sortFields } = collections[urlCollection]
    const aggs = buildAggs(refinementListFilters)
    const initialQueryState: IElasticSearchQuery = {
      aggs,
      filters: initialFilter || {},
      from: urlStart,
      searchFields,
      size: size || 20,
      sortFields,
      stringInput: q
    }
    dispatch(setQueryFields({ ...initialQueryState }))
    dispatch(setSelectedIndex({ selectedIndex: currentPage }))
    return url
  }

  const pushHistory = (navigate, currentSearchContext, stringInput, start): any => {
    const search = (stringInput && start)
      ? {
          q: stringInput,
          start
        }
      : !start && stringInput ? { q: stringInput } : start ? { start } : null

    const url = {
      pathname: currentSearchContext,
      search: `?${stringify(search)}`
    }
    navigate(url)
  }

  useEffect((): void => {
    if (!isInitialized) {
      const url = initSearchFromRoute()
      fetchResponse(url)
      setIsInitialized(true)
    } else {
      const url = process.env.REACT_APP_SEARCH_API_HOST + currentCollection + ElasticSearchConstants.SEARCH
      if (useHistory && pathname === currentSearchContext) {
        pushHistory(navigate, currentSearchContext, stringInput, from)
      }
      if (prevJson !== json) {
        fetchResponse(url)
      }
    }
  }, [json, prevJson, size])

  return (
    <>
      {props.children}
    </>
  )
}
