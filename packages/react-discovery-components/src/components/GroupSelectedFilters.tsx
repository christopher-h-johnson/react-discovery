import { Chip, List } from '@mui/material'
import { OSCore, useAppDispatch } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { IOverridableStyledComponent } from '..'
import { useGroupSelectedFiltersStyles } from '../styles'

export const GroupSelectedFilters: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes: any = props.classes || useGroupSelectedFiltersStyles({})
  const dispatch = useAppDispatch()
  const filters = OSCore.state.getFilters()

  const onClose = (field: string, filter: any): void => {
    const newFilters = filters[field].filter((f): boolean => f !== filter)
    dispatch(OSCore.state.setSelectedFilters({ field, filters: newFilters }))
    dispatch(OSCore.state.setFrom({ from: 0 }))
  }

  const buildFilters = (filters): ReactElement[] => {
    const values = Object.values(filters)
    return values && values[0] !== undefined && Object.entries(filters).map(([field, values]): any =>
      (values as []).map((val, key): ReactElement => {
        return (
          <Chip
            className={classes.chip}
            color="primary"
            component='div'
            data-testid='selected-filter'
            key={key}
            label={val}
            onDelete={(): void => onClose(field, val)}
          />)
      }))
  }

  return (
    <List component="nav" style={{ display: 'flex' }}>
      {buildFilters(filters)}
    </List>
  )
}
