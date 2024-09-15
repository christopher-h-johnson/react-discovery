import { FormControl, ListItemText, MenuItem, Select } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import {
  getCollectionByKey,
  getCollections,
  getCurrentCollection,
  ICollection,
  IElasticSearchQuery,
  OSCore,
  setCurrentCollection,
  useAppDispatch,
  usePrevious
} from '@react-discovery/internal'

import React, { ReactElement, useEffect, useState } from 'react'

const useStyles = makeStyles((): any => ({
  primary: {
    fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
    fontSize: '.875rem',
    fontWeight: 500,
    letterSpacing: '.01785714em',
    lineHeight: '1.25rem'
  }
}))

export const CollectionSelector: React.FC<any> = (): ReactElement => {
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useAppDispatch()
  const classes: any = useStyles({})
  const collections = getCollections()
  const currentCollection = getCurrentCollection()
  const collectionObj = getCollectionByKey(currentCollection)

  const jsonCollection = JSON.stringify(collectionObj)
  const prevJsonCollection = usePrevious(jsonCollection)
  const size = OSCore.state.getSize()

  useEffect((): void => {
    if (!isInitialized) {
      setIsInitialized(true)
    }
    if (prevJsonCollection !== jsonCollection) {
      const { initialFilter, refinementListFilters, searchFields, sortFields } = collectionObj
      const aggs = OSCore.builders.buildAggs(refinementListFilters)
      const qs: IElasticSearchQuery = {
        aggs,
        filters: initialFilter || {},
        from: 0,
        searchFields,
        size: size || 20,
        sortFields,
        stringInput: null
      }
      dispatch(OSCore.state.setQueryFields({ ...qs }))
      if (isInitialized) {
        // navigation.navigate(currentSearchContext)
      }
    }
  }, [prevJsonCollection, jsonCollection, isInitialized, collectionObj, size, dispatch])

  const getIndexNames = (): any => {
    const map = new Map()
    const sortStringValues = (a, b) => a[1] === b[1] ? 0 : a[1] > b[1] ? 1 : -1
    Object.keys(collections).forEach((key: string) => {
      map.set(key, (collections[key] as ICollection).name)
    })
    return new Map([...map].sort(sortStringValues))
  }
  const indexMap = getIndexNames()

  const buildSelectOptions = (): any => {
    return Array.from(indexMap, ([key, value]: any) =>
      <MenuItem
        component='li'
        key={key}
        value={key}
      >
        <ListItemText classes={{ primary: classes.primary }}>{value}</ListItemText>
      </MenuItem>)
  }

  const handleIndexChange = (event): void => {
    const currentCollection = event.target.value as string
    dispatch(setCurrentCollection({ currentCollection }))
  }

  return (
    <FormControl>
      <Select
        onChange={handleIndexChange}
        value={currentCollection}
      >
        {buildSelectOptions()}
      </Select>
    </FormControl>
  )
}
