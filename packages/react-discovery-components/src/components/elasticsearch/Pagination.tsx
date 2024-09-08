import { ChevronLeft, ChevronRight, SkipNext, SkipPrevious } from '@mui/icons-material'
import { List, ListItemButton, ListItemText } from '@mui/material'
import { getSelectedIndex, OSCore, setSelectedIndex, useAppDispatch, usePrevious } from '@react-discovery/internal'
import React, { ReactElement, useEffect } from 'react'
import { IOverridableStyledComponent } from '../../index'
import { usePaginationStyles } from '../../styles'

export const Pagination: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes: any = props.classes || usePaginationStyles({})
  const dispatch = useAppDispatch()
  const from = OSCore.state.getFrom()
  const size = OSCore.state.getSize()
  const selectedIndex = getSelectedIndex()
  const prevSelectedIndex = usePrevious(selectedIndex)
  const numFound = OSCore.state.getNumFound()
  const currentPage = from / size
  const pageAmt = Math.ceil(numFound / size)

  useEffect((): void => {
    if (from === null && prevSelectedIndex === undefined) {
      if (selectedIndex !== 0) {
        dispatch(setSelectedIndex({ selectedIndex: 0 }))
      }
    }
  })

  let rangeStart = Math.max(0, currentPage - 2)
  const rangeEnd = rangeStart + 5 > pageAmt ? pageAmt : rangeStart + 5

  const buildRangeStart = (): void => {
    if (rangeEnd - rangeStart < 5 && rangeStart > 0) {
      rangeStart = rangeEnd - 5
    }
  }

  const range = (start, stop, step): number[] =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i): number => start + (i * step))

  const buildPages = (rangeStart, rangeEnd): number[] => {
    return range(rangeStart, rangeEnd, 1)
  }

  buildRangeStart()
  const pages = buildPages(rangeStart, rangeEnd - 1)

  const onPageChange = (page): void => {
    if (page >= pageAmt || page < 0) {
      return
    }
    dispatch(OSCore.state.setFrom({ from: page * size }))
    dispatch(setSelectedIndex({ selectedIndex: page }))
    window.scrollTo(0, 0)
  }

  const buildIcon = (key): ReactElement => {
    switch (key) {
      case 'first':
        return <SkipPrevious/>
      case 'previous':
        return <ChevronLeft/>
      case 'next':
        return <ChevronRight/>
      case 'last':
        return <SkipNext/>
    }
  }

  const PageControlIndexButton = (page, label, key): ReactElement =>
    <ListItemButton
      data-testid={`page-index-${key}`}
      dense
      key={key}
      onClick={(): void => onPageChange(page)}
      selected={selectedIndex === page}
    >
      <ListItemText primary={label}/>
    </ListItemButton>

  const PageControlButton = (page, key): ReactElement =>
    <ListItemButton
      data-testid={`page-control-${key}`}
      dense
      key={key}
      onClick={(): void => onPageChange(page)}
      selected={selectedIndex === page}
    >
      {buildIcon(key)}
    </ListItemButton>

  const renderPages = (pages): ReactElement => {
    return pages && pages.map((page, i): ReactElement =>
      PageControlIndexButton(page, page + 1, i)
    )
  }

  return (
    <div className={classes.listWrapper}>
      <List component="nav" style={{ display: 'flex' }}>
        {PageControlButton(0, 'first')}
        {PageControlButton(currentPage - 1, 'previous')}
        {renderPages(pages)}
        {PageControlButton(currentPage + 1, 'next')}
        {PageControlButton(pageAmt - 1, 'last')}
      </List>
    </div>
  )
}
