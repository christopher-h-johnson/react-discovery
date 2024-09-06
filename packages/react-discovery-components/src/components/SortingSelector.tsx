import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { IOverridableStyledComponent } from '..'
import { FormControl, IconButton, Input, InputLabel, NativeSelect } from '@mui/material'
import React, { ReactElement } from 'react'
import { ESCore } from '@react-discovery/core'
import { ISortField } from '@react-discovery/configuration'
import { useAppDispatch } from '@react-discovery/elasticsearch-app'
import { useSortingSelectorStyles } from '../styles'
import { useTranslation } from 'react-i18next'

export const SortingSelector: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  const { t } = useTranslation('vocab')
  const classes: any = props.classes || useSortingSelectorStyles({})
  const dispatch = useAppDispatch()
  const sortFields = ESCore.state.getSortFields()
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
    dispatch(ESCore.state.setSortFields({ sortFields: sorted }))
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
      dispatch(ESCore.state.setSortFields({ sortFields: newSortFields }))
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
          size="large">
          <ArrowUpward/>
        </IconButton>)
      );
    } else {
      return (
        (<IconButton
          aria-label="Sort Ascending"
          className={classes.button}
          data-testid='sorting-order-asc'
          href=''
          onClick={(): void => handleSortOrder('asc')}
          size="large">
          <ArrowDownward/>
        </IconButton>)
      );
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
          input={<Input id="sort-native-simple" name="sort" />}
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
