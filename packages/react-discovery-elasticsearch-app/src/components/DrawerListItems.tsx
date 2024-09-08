import { Description, Home, PictureInPicture, Search, Settings } from '@mui/icons-material'
import { Badge, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material'
import { getCurrentSearchContext } from '@react-discovery/configuration'
import { usePrevious } from '@react-discovery/internal'
import { getNumberOfWorkspaceNodes } from '@react-discovery/workspace'
import React, { forwardRef, ReactElement, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'

export const DrawerListItems: React.FC<any> = (): ReactElement => {
  const [isInitialized, setIsInitialized] = useState(false)
  const currentSearchContext = getCurrentSearchContext()
  const route = useLocation()
  const prevRoute = usePrevious(route)
  const numberOfNodes = getNumberOfWorkspaceNodes()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const { t } = useTranslation('common')

  const listItems = useMemo(() => [
    {
      id: 'home',
      index: 0,
      path: '/',
      text: 'Home'
    },
    {
      id: 'search',
      index: 1,
      path: currentSearchContext,
      text: 'Search'
    },
    {
      id: 'workspace',
      index: 2,
      path: '/workspace',
      text: 'Workspace'
    },
    {
      id: 'detail',
      index: 3,
      path: '/detail',
      text: 'Detail'
    },
    {
      id: 'settings',
      index: 4,
      path: '/settings',
      text: 'Settings'
    }
  ], [currentSearchContext])

  useEffect((): any => {
    const pathname = location.pathname
    const context = pathname.split('/')[1]
    const [startItem] = listItems.filter((item): boolean => item.path.includes(context))

    if (!isInitialized) {
      startItem ? setSelectedIndex(startItem.index) : setSelectedIndex(0)
      setIsInitialized(true)
    }
    if (route !== prevRoute) {
      startItem && setSelectedIndex(startItem.index)
    }
  }, [route, prevRoute, listItems, isInitialized])

  const buildListItemIcon = (item: string): any => {
    switch (item) {
      case 'home':
        return <Home/>
      case 'search':
        return <Search/>
      case 'workspace':
        return (
          <Badge
            badgeContent={numberOfNodes}
            color="secondary"
          >
            <PictureInPicture/>
          </Badge>
        )
      case 'detail':
        return <Description/>
      case 'settings':
        return <Settings/>
    }
  }

  // eslint-disable-next-line no-empty-pattern
  const handleListItemClick = ({}, index): void => {
    setSelectedIndex(index)
  }

  const navRef = (item) => item.path !== '/detail'
  // eslint-disable-next-line react/display-name
    ? forwardRef((props: any, ref: any) => <NavLink to={item.path} {...props} ref={ref} />)
    : 'li'

  const buildListItems = (items: any): ReactElement[] => {
    return items.map((item: any, i): ReactElement =>
      <ListItemButton
        component={navRef(item)}
        key={item.index}
        onClick={(event): void => handleListItemClick(event, i)}
        selected={selectedIndex === i}
        style={{ color: '#2f2c2c', textDecoration: 'none' }}
      >
        <Tooltip
          key={item.key}
          title={t(item.text)}>
          <ListItemIcon>
            {buildListItemIcon(item.id)}
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary={t(item.text)} />
      </ListItemButton>
    )
  }

  return (
    <>{buildListItems(listItems)}</>
  )
}
