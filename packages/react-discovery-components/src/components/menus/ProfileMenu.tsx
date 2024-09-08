import { AccountCircle } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

export const ProfileMenu: React.FC<any> = (): ReactElement => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = (event): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  const renderMenu: ReactElement = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom'
      }}
      onClose={handleMenuClose}
      open={isMenuOpen}
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}
    >
      <MenuItem
        component='div'
        onClick={handleMenuClose}
      >{t('profile')}
      </MenuItem>
      <MenuItem
        component='div'
        onClick={handleMenuClose}
      >
        {t('account')}
      </MenuItem>
    </Menu>
  )

  return (<>
    <IconButton
      aria-haspopup="true"
      aria-owns={isMenuOpen ? 'material-appbar' : undefined}
      color="inherit"
      edge="end"
      href=''
      onClick={handleProfileMenuOpen}
      size="large">
      <AccountCircle />
    </IconButton>
    {renderMenu}
  </>)
}
