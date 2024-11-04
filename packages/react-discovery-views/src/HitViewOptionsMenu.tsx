import { MoreVert, MoreVertOutlined } from '@mui/icons-material'
import { Badge, IconButton, Menu, MenuItem, Theme, Tooltip, Typography } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import { useAppDispatch } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

interface IHitViewOptionsMenu {
  actions: any;
  id: string;
  index: string;
}

const StyledBadge = withStyles((theme: Theme) => ({
  badge: {
    border: `2px solid ${
      theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`
  }
}))(Badge)

export const HitViewOptionsMenu: React.FC<IHitViewOptionsMenu> = (props): ReactElement => {
  const { actions, id, index } = props
  const { getNumberOfWorkspaceNodesForId, setViewIdMap } = actions
  const nodeCount = getNumberOfWorkspaceNodesForId(id)
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const dispatch = useAppDispatch()

  const handleHitViewOptionsMenuOpen = (event): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleAddToWorkspace = (key): void => {
    switch (key) {
      case 'addDataToWorkspace':
        dispatch(setViewIdMap({ id, index, type: 'data' }))
    }
    setAnchorEl(null)
  }

  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  const options = [
    {
      key: 'addDataToWorkspace',
      label: 'addDataToWorkspace'
    }
  ]

  const buildMenuItems = (): ReactElement[] => {
    return options && options.map((option, i): ReactElement =>
      <MenuItem
        component='div'
        data-testid={`hitViewOptions-menu-item-${i}`}
        key={i}
        onClick={(): void => handleAddToWorkspace(option.key)}
      >
        <Typography>{t(option.label)}</Typography>
      </MenuItem>)
  }

  const renderMenu: ReactElement = (
    <Menu
      anchorEl={anchorEl}
      onClose={handleMenuClose}
      open={isMenuOpen}
    >
      {buildMenuItems()}
    </Menu>
  )

  const buildStyledBadge = () => {
    return (
      (<StyledBadge
        badgeContent={nodeCount}
        color="secondary"
      > <IconButton href='' onClick={handleHitViewOptionsMenuOpen} size="large">
            {
              nodeCount > 0
                ? <MoreVert style={{ padding: '5px' }}/>
                : <MoreVertOutlined style={{ padding: '5px' }}/>
            }
          </IconButton>
      </StyledBadge>)
    )
  }

  return (
    <div>
      <Tooltip
        title={t('moreOptions')}>
        {buildStyledBadge()}
      </Tooltip>
      {renderMenu}
    </div>
  )
}
