import { Grid, Theme } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import classNames from 'classnames'
import React, { ReactElement } from 'react'
import { PersistentDrawer } from './PersistentDrawer'
import { SearchAppBar } from './SearchAppBar'

interface IDiscoveryApp {
  component: ReactElement;
  title?: string;
}

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme): any =>
  createStyles({
    content: {
      flexGrow: 1,
      marginLeft: drawerWidth,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp
      })
    },
    contentShift: {
      height: '100%',
      marginLeft: 73,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut
      })
    },
    mainGrid: {
      height: '100%'
    }
  }))

export const DiscoveryApp: React.FC<IDiscoveryApp> = (props): ReactElement => {
  const classes: any = useStyles({})
  const { component } = props
  const [open, setOpen] = React.useState(false)

  const handleDrawerChange = (): void => {
    setOpen(!open)
  }

  return (
    <Grid container>
      <SearchAppBar
        handleDrawerChange={handleDrawerChange}/>
      <Grid
        className={classes.mainGrid}
        item
        xs={12}
      >
        <PersistentDrawer open={open}/>
        <main
          className={classNames({ [classes.content]: open }, {
            [classes.contentShift]: !open
          })}
        >
          {component}
        </main>
      </Grid>
    </Grid>
  )
}
