import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { FormControl, IconButton, Input, InputLabel, NativeSelect } from '@mui/material'
import { ISortField, OSCore, useAppDispatch } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { IOverridableStyledComponent, ItemList } from '..'
import { useSortingSelectorStyles } from '../styles'

export const SortingSelector: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  const { t } = useTranslation('vocab')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes: any = props.classes || useSortingSelectorStyles({})
  const dispatch = useAppDispatch()
  const sortFields = OSCore.state.getSortFields()
  const [selectorValue, setSelectorValue] = React.useState('')
  const [sortOrder, setSortOrder] = React.useState('asc')

  const handleChange = (e): void => {
    const newSortFields = sortFields.reduce((acc, currVal): any => {
      let val
      if (currVal.field === e.target.value) {
        val = {
          ...currVal,
          isSelected: true
        }
      } else {
        val = {
          ...currVal,
          isSelected: false
        }
      }
      return [...acc, val]
    }, [])
    const sorted = newSortFields.sort((a: any, b: any): any => (a.isSelected === b.isSelected) ? 0 : a.isSelected ? -1 : 1)
    const [currentSortSelection] = sorted
    dispatch(OSCore.state.setSortFields({ sortFields: sorted }))
    setSelectorValue(currentSortSelection.field)
    setSortOrder(currentSortSelection.order)
  }

  const handleSortOrder = (value): void => {
    if (value !== sortOrder) {
      setSortOrder(value)
      const order = {
        order: value
      }
      const [currentSortField] = sortFields
      const newSortField = { ...currentSortField, ...order }
      const newSortFields = sortFields.map((sf, i): ISortField => {
        if (i === 0) {
          return newSortField
        }
        return sf
      })
      dispatch(OSCore.state.setSortFields({ sortFields: newSortFields }))
    }
  }

  const buildOptions = (): ReactElement[] => {
    return sortFields.map((sf, i): ReactElement => <option key={i} value={sf.field}>{t(sf.label)}</option>)
  }

  const buildSortOrderButton = (): ReactElement => {
    if (sortOrder === 'asc') {
      return (
        (<IconButton
          aria-label="Sort Descending"
          className={classes.button}
          data-testid='sorting-order-desc'
          href=''
          onClick={(): void => handleSortOrder('desc')}
          size="medium">
          <ArrowUpward/>
        </IconButton>)
      )
    } else {
      return (
        (<IconButton
          aria-label="Sort Ascending"
          className={classes.button}
          data-testid='sorting-order-asc'
          href=''
          onClick={(): void => handleSortOrder('asc')}
          size="medium">
          <ArrowDownward/>
        </IconButton>)
      )
    }
  }

  return sortFields
    ? (
    <div className={classes.root}>
      <FormControl
        className={classes.formControl}
        component='div'
      >
        <InputLabel shrink htmlFor="sort-native-simple">Sort By</InputLabel>
        <NativeSelect
          onChange={handleChange}
          value={selectorValue}
        >
          {buildOptions()}
        </NativeSelect>
      </FormControl>
      {buildSortOrderButton()}
    </div>
      )
    : null
}
