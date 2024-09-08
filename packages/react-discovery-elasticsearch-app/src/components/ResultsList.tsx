import { CircularProgress, useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Grid2'
import makeStyles from '@mui/styles/makeStyles'
import { ES, HitStats, useMinimalResultViewerStyles, ViewSwitcherToggle } from '@react-discovery/components'
import { getCurrentLanguage, getViewType } from '@react-discovery/configuration'
import { OSCore, usePrevious } from '@react-discovery/internal'
import React, { ReactElement, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ImageGridViewer, ListFilters, MinWidthResultsGrid, ViewTypeSwitcher } from '.'

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
  const hits = OSCore.state.getHits()

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
          ? <Grid style={{ width: '100%' }} size={10}>
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
