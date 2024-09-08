import { CircularProgress, Grid } from '@mui/material'
import { useMinWidthResultsGridStyles } from '@react-discovery/components'
import { OSCore } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { ViewTypeSwitcher } from '.'

export const MinWidthResultsGrid: React.FC<any> = (): ReactElement => {
  const classes: any = useMinWidthResultsGridStyles({})
  const hits = OSCore.state.getHits()
  return (
    (<Grid
      item xs={12}
    >
      <Grid
        className={classes.gridActions}
        container
        direction="row"
      >
      </Grid>
      <Grid
        container
        direction="row"
      >
      </Grid>
      <Grid
        alignItems="center"
        container
        direction="row"
        justifyContent="center"
      >
      </Grid>
      <Grid
        className={classes.gridContent}
      >
        {hits
          ? <>
            <ViewTypeSwitcher/>
          </>
          : <CircularProgress className={classes.progress}/>}
      </Grid>
      <Grid
        alignItems="center"
        container
        direction="row"
        justifyContent="center"
      >
      </Grid>
    </Grid>)
  )
}
