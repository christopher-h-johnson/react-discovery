import { FormatLineSpacing, Search, Sort } from '@mui/icons-material'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { MosaicNode } from 'react-mosaic-component'
import { CollectionSelector, SizeSelector, SortedSelector } from '.'

export interface IWorkspaceMosaic {
  currentNode?: MosaicNode<number> | null;
  windowAppBar?: any;
}

const useStyles = makeStyles((theme): any => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 640,
    minWidth: 400
  },
  sliderRoot: {
    width: 300
  }
}))

export const Settings: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles({})
  const { t } = useTranslation(['common'])

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItemButton>
          <ListItemIcon>
            <Search />
          </ListItemIcon>
          <ListItemText primary={t('setCollection')} />
          <CollectionSelector/>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <FormatLineSpacing />
          </ListItemIcon>
          <ListItemText primary={t('setSize')} />
          <div className={classes.sliderRoot}>
            <SizeSelector/>
          </div>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Sort />
          </ListItemIcon>
          <ListItemText primary={t('setIsSorted')} />
            <SortedSelector/>
        </ListItemButton>
      </List>
    </div>
  )
}
