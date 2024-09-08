import { Book, ChatBubble, Image, Info } from '@mui/icons-material'
import { Badge, Chip, Tab, Tabs, Theme, Tooltip } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import { buildEntityCountForType } from '@react-discovery/components'
import { getSelectedIndex, getSelectedTabForId } from '@react-discovery/configuration'
import { OSCore, setCurrentSelectedTab, setItemViewType, setViewType, useAppDispatch } from '@react-discovery/internal'
import { Domain, useHitViewStyles } from '@react-discovery/views'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

interface IEntityBadges {
  entities: any;
  i: number;
  id: string;
}

const StyledBadge = withStyles((theme: Theme) => ({
  badge: {
    border: `2px solid ${
      theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
    right: -3,
    top: '50%'
  },
  colorSecondary: {
    backgroundColor: '#46926c',
    color: theme.palette.secondary.contrastText
  }
}))(Badge)

export const EntityBadges: React.FC<IEntityBadges> = (props): ReactElement => {
  const { entities, id, i } = props
  const classes: any = useHitViewStyles({})
  const indexMultiplier = getSelectedIndex()
  const size = OSCore.state.getSize()
  const chipLabel = (i + 1) + (size * indexMultiplier)
  const dispatch = useAppDispatch()
  const { t } = useTranslation('vocab')
  const value = getSelectedTabForId(id) || 0

  // eslint-disable-next-line no-empty-pattern
  const handleChange = ({}, newValue: number): void => {
    dispatch(setCurrentSelectedTab({ currentSelectedTab: newValue, id }))
    dispatch(setViewType({ viewType: 'compact' }))
  }

  const items = [
    {
      key: 0,
      type: 'index'
    },
    {
      key: 1,
      type: 'info'
    },
    {
      key: 2,
      type: Domain.MEDIA
    },
    {
      key: 3,
      type: Domain.DESCRIPTION
    },
    {
      key: 4,
      type: Domain.ANNOTATION
    }
  ]

  const buildStyledBadge = (component, type): ReactElement => {
    return (
      <StyledBadge
        badgeContent={buildEntityCountForType(entities, type)}
        color="secondary"
      >
        {component}
      </StyledBadge>
    )
  }

  const buildIconForEntityType = (type): ReactElement => {
    const DIGITALISAT = <Image style={{ padding: '5px' }}/>
    const BESCHREIBUNG = <Book style={{ padding: '5px' }}/>
    const ANNOTATION = <ChatBubble style={{ padding: '5px' }}/>
    switch (type) {
      case 'index':
        return (
          <Chip
            className={classes.chip}
            color="secondary"
            label={chipLabel}
            size="small"
            variant="outlined"
          />
        )
      case 'info':
        return <Info style={{ padding: '5px' }}/>
      case Domain.MEDIA:
        return buildStyledBadge(DIGITALISAT, type)
      case Domain.DESCRIPTION:
        return buildStyledBadge(BESCHREIBUNG, type)
      case Domain.ANNOTATION:
        return buildStyledBadge(ANNOTATION, type)
      default:
        return (
          <Chip
            className={classes.chip}
            color="secondary"
            label={chipLabel}
            size="small"
            variant="outlined"
          />
        )
    }
  }

  const handleClick = (id, type): void => {
    switch (type) {
      case 'index':
        dispatch(setItemViewType({ id, itemViewType: 'index' }))
        break
      case 'info':
        dispatch(setItemViewType({ id, itemViewType: 'info' }))
        break
      case Domain.MEDIA:
        dispatch(setItemViewType({ id, itemViewType: Domain.MEDIA }))
        break
      case Domain.DESCRIPTION:
        dispatch(setItemViewType({ id, itemViewType: Domain.DESCRIPTION }))
        break
      case Domain.ANNOTATION:
        dispatch(setItemViewType({ id, itemViewType: Domain.ANNOTATION }))
        break
      default:
        dispatch(setItemViewType({ id, itemViewType: 'info' }))
    }
  }
  const buildCardActions = (items): ReactElement[] => {
    return items && items.map((item): ReactElement => {
      return (
        <Tooltip
          key={item.key}
          title={t(item.type)}>
          <Tab
            href=''
            icon={buildIconForEntityType(item.type)}
            onClick={(): void => handleClick(id, item.type)}
          />
        </Tooltip>
      )
    })
  }
  return (
    <Tabs
      aria-label="icon tabs"
      indicatorColor="primary"
      onChange={handleChange}
      textColor="primary"
      value={value}
      variant="scrollable"
    >
      {buildCardActions(items)}
    </Tabs>
  )
}
