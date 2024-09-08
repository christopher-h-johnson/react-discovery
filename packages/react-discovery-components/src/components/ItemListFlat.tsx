import { Button, Divider, List, ListItemButton, ListItemText, Typography } from '@mui/material'
import { getCurrentCollection, OSCore, setRefinementListFilterSize, useAppDispatch } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { useItemListStyles } from '../styles'

export const ItemListFlat: React.FC<any> = (props): ReactElement => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes: any = props.classes || useItemListStyles({})
  const dispatch = useAppDispatch()
  const { field, id, label, size } = props
  const aggregation = OSCore.state.getAggregation(field)
  const filters = OSCore.state.getFiltersForField(field)
  const stringInput = OSCore.state.getStringInput()
  const currentCollection = getCurrentCollection()
  const { t } = useTranslation()

  const handleShowMore = (filterName): void => {
    const newSize = size + 10
    dispatch(setRefinementListFilterSize({ currentCollection, filterName, size: newSize }))
    dispatch(OSCore.state.setSelectedFilters({ field, filters: [] }))
  }

  const handleChange = (key): void => {
    const newFilters = filters && filters.length ? filters.filter((f): any => f !== key) : []
    newFilters.push(key)
    dispatch(OSCore.state.setSelectedFilters({ field, filters: newFilters }))
    dispatch(OSCore.state.setQueryInput({ stringInput }))
    dispatch(OSCore.state.setFrom({ from: 0 }))
  }

  const actions = (aggregation): ReactElement => {
    return aggregation.buckets.map((bucket, i): any => {
      return (
        <ListItemButton
          data-testid={`item-${i}`}
          dense
          disableGutters={true}
          key={bucket.key}
          onClick={(): void => handleChange(bucket.key)}
        >
          <ListItemText
            className={classes.content}
            primary={
              <Typography
                className={classes.grow}
                color='textSecondary'
                component="div"
                noWrap={true}
                variant='body2'
              >
                {bucket.key}
              </Typography>
            }
            secondary={
              <Typography
                className={classes.inline}
                color="textSecondary"
                component="div"
                variant="body2"
              >
                {bucket.doc_count}
              </Typography>
            }/>
        </ListItemButton>
      )
    })
  }

  return (
    <List
      component="nav"
      style={{ paddingRight: 32, width: '100%' }}
    >
      <Typography
        className={classes.inline}
        color="textPrimary"
        component="div"
        variant="button"
      >
        {label}
      </Typography>
      <Divider style={{ margin: 12, marginLeft: 0 }}/>
      {aggregation && actions(aggregation)}
      <Button
        color='primary'
        href=''
        onClick={(): void => handleShowMore(id)}
        size="small"
        variant="outlined"
      >
        {t('viewMore')}
      </Button>
    </List>
  )
}
