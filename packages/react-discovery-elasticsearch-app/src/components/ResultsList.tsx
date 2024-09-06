import { CircularProgress, Grid, useMediaQuery } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import {
  ES,
  HitStats,
  ViewSwitcherToggle,
  useMinimalResultViewerStyles
} from '@react-discovery/components'
import { ESCore } from '@react-discovery/core'
import { usePrevious } from '../hooks'
import { ImageGridViewer, ListFilters, MinWidthResultsGrid, ViewTypeSwitcher } from '.'
import React, { ReactElement, useEffect } from 'react'
import { getCurrentLanguage, getViewType } from '@react-discovery/configuration'
import { useTranslation } from 'react-i18next'

export const useStyles = makeStyles((): any => ({
  gridActions: {
    alignItems: 'center',
    display: 'flex',
    padding: '10px'
  },
  main: {
    display: 'flex',
    padding: 20
  }
}))

export const ResultsList: React.FC<any> = (): ReactElement => {
  const { i18n } = useTranslation(['common', 'vocab'])
  const classes: any = useMinimalResultViewerStyles({})
  const mainClasses: any = useStyles({})
  const currentLanguage = getCurrentLanguage()
  const previousLanguage = usePrevious(currentLanguage)
  const matches = useMediaQuery('(min-width:600px)')
  const viewType = getViewType()
  const hits = ESCore.state.getHits()

  useEffect((): any => {
    if (previousLanguage !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18n, previousLanguage])

  return (
    matches
      ? <Grid
        alignItems="center"
        container
        direction="column"
        justifyContent="center"
        spacing={3}
      >
        {hits
          ? <Grid item style={{ width: '100%' }} xs={10}>
            <Grid
              className={mainClasses.gridActions}
              container
              direction="row"
            >
              <HitStats/>
              <ViewSwitcherToggle/>
            </Grid>
            <ListFilters/>
            {viewType === 'grid'
              ? <ImageGridViewer/>
              : <ViewTypeSwitcher/>
            }
            <Grid
              alignItems="center"
              className={mainClasses.gridActions}
              container
              direction="row"
              justifyContent="center"
            >
              <ES.Pagination/>
            </Grid>
          </Grid>
          : <CircularProgress className={classes.progress}/>
        }
      </Grid>
      : <MinWidthResultsGrid/>
  )
}
