import { Add } from '@mui/icons-material'
import { Fab, Toolbar } from '@mui/material'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { setViewIdMap, useAppDispatch } from '@react-discovery/internal'
import noop from 'lodash/noop'
import React, { ReactElement } from 'react'

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme): any => ({
  appBar: {
    backgroundColor: '#FFF'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  root: {
    flexGrow: 1
  }
}))

export const ZeroState: React.FC<any> = (props): ReactElement => {
  const classes: any = useStyles({})
  const dispatch = useAppDispatch()
  const { createNode } = props
  const handleAddToWorkspace = (): any => {
    Promise.resolve(createNode())
      .then((node) => dispatch(setViewIdMap({ id: node, manifest: null, type: 'data' })))
      .catch(noop)
  }

  return (
    <Toolbar variant="dense">
      <div className={classes.grow}/>
      <Fab
        aria-label="Add"
        className={classes.menuButton}
        onClick={(): Promise<any> => handleAddToWorkspace()}
        size="small"
        variant="extended"
      >
        <Add/>
        Add New Window
      </Fab>
    </Toolbar>
  )
}
