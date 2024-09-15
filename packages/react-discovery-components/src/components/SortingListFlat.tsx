import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { Divider, IconButton, List, ListItemButton, ListItemText, Typography } from '@mui/material'
import { ISortField, OSCore, useAppDispatch } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { FlexBox } from '.'
import { IOverridableStyledComponent } from '..'
import { useSortingSelectorStyles } from '../styles'

export const SortingListFlat: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  const { t } = useTranslation('vocab')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes: any = props.classes || useSortingSelectorStyles({})
  const dispatch = useAppDispatch()
  const sortFields = OSCore.state.getSortFields()
  const [sortOrder, setSortOrder] = React.useState('asc')

  const handleChange = (field): void => {
    const newSortFields = sortFields.reduce((acc, currVal): any => {
      let val
      if (currVal.field === field) {
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

  const buildSortOrderButton = (): ReactElement => {
    if (sortOrder === 'asc') {
      return (
        <IconButton
          aria-label="Sort Descending"
          className={classes.button}
          data-testid='sorting-order-desc'
          onClick={(): void => handleSortOrder('desc')}
          size='small'
        >
          <ArrowUpward fontSize='inherit'/>
        </IconButton>)
    } else {
      return (
        <IconButton
          aria-label="Sort Ascending"
          className={classes.button}
          data-testid='sorting-order-asc'
          onClick={(): void => handleSortOrder('asc')}
          size='small'
        >
          <ArrowDownward fontSize='inherit'/>
        </IconButton>)
    }
  }

  const actions = (): any => {
    return sortFields.map((sf, i): any => {
      return (
        <ListItemButton
          component='div'
          data-testid={`item-${i}`}
          dense
          disableGutters={true}
          key={i}
          onClick={(): void => handleChange(sf.field)}
          role={undefined}
        >
          <ListItemText
            className={classes.content}
            primary={
              <Typography
                className={classes.grow}
                color='textSecondary'
                component="div"
                variant='body2'
              >
                {t(sf.label)}
              </Typography>
            }
          />
        </ListItemButton>
      )
    })
  }

  return sortFields
    ? (
    <List
      component="nav"
      style={{ minWidth: 100, paddingRight: 32, width: '100%' }}
    >
      <FlexBox>
        <Typography
          className={classes.inline}
          color="textPrimary"
          component="div"
          variant="button"
        >
          Sort By
        </Typography>
        <div style={{ flexGrow: 1 }}/>
        {buildSortOrderButton()}
      </FlexBox>
      <Divider style={{ margin: 12, marginTop: 8, marginLeft: 0 }} variant="fullWidth"/>
      {actions()}
    </List>
      )
    : null
}
