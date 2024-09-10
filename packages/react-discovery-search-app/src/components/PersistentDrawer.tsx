import MuiDrawer from '@mui/material/Drawer'
import MuiList from '@mui/material/List'
import { CSSObject, styled, Theme } from '@mui/material/styles'
import React, { ReactElement } from 'react'
import { DrawerListItems } from './DrawerListItems'

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line
  interface DefaultTheme extends Theme {}
}

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  marginTop: 56,
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
  marginTop: 56,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme)
        }
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme)
        }
      }
    ]
  })
)

export const PersistentDrawer: React.FC<any> = (props): ReactElement => {
  const { open } = props

  return (
    <Drawer
      open={open}
      variant="permanent"
    >
      <MuiList style={{ padding: 8 }}>
        <DrawerListItems/>
      </MuiList>
    </Drawer>
  )
}
