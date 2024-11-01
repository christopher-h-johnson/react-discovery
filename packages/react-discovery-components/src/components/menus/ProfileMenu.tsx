import { AccountCircle, Logout, Login, Person } from '@mui/icons-material'
import { Avatar, Box, CircularProgress, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import { useAuth, SignOut } from '@react-discovery/firebase'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const ProfileMenu: React.FC<any> = (): ReactElement => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { user, loading } = useAuth()
  const isMenuOpen = Boolean(anchorEl)
  const navigate = useNavigate()
  const handleProfileMenuOpen = (event): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  const loginIcon: ReactElement = (
    <IconButton
      color="inherit"
      edge="end"
      href=''
      onClick={() => navigate('/signin')}
      size="large">
      <Login/><Typography variant='button'><Box sx={{ textAlign: 'right', m: 1 }}>{t('login')}</Box></Typography>
    </IconButton>
  )

  const logoutIcon: ReactElement = (
    <IconButton
      color="inherit"
      edge="end"
      href=''
      onClick={SignOut}
      size="large">
      <Logout/> <Typography variant='button'><Box sx={{ textAlign: 'right', m: 1 }}>{t('logout')}</Box></Typography>
    </IconButton>
  )

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
      >{!user ? loginIcon : logoutIcon}
      </MenuItem>
      {user
        ? <MenuItem
        component='div'
        onClick={handleMenuClose}
      >
          <Person/><Typography variant='button'><Box sx={{ textAlign: 'right', m: 1 }}>{t('account')}</Box></Typography>
      </MenuItem>
        : null}
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
          {!user
            ? <AccountCircle/>
            : <Avatar
            alt="Account's profile image"
            src={user.photoURL}
            />}
            </IconButton>
          {!loading ? renderMenu : <CircularProgress/>}
  </>)
}
