import { Grid, IconButton } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import withStyles from '@mui/styles/withStyles'
import React, { ReactElement } from 'react'
import { SingleImageOSDViewer, buildTileSourceForGridViewerImage } from '@react-discovery/iiif'
import { getCurrentGridViewerObjectId, getCurrentGridViewerObjectThumbnail, setCurrentGridViewerObject } from '@react-discovery/configuration'
import { Close } from '@mui/icons-material'
import { ESCore } from '@react-discovery/core'
import { ViewTypeSwitcher } from './ViewTypeSwitcher'
import { useAppDispatch } from '../state'
import { v4 as uuidv4 } from 'uuid'
import { buildHighlightedValueForHit, TitleIdHeader } from '@react-discovery/components'
import { Domain } from '@react-discovery/views'

const useStyles = makeStyles((): any => ({
  closeIcon: {
    display: 'flex',
    left: 10,
    position: 'absolute',
    right: 0,
    zIndex: 500
  },
  flexSection: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    minHeight: 0
  },
  gridRoot: {
    background: '#eee',
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    width: '100%'
  },
  gridViewer: {
    flexGrow: 1,
    height: '100vh',
    position: 'sticky',
    top: 70
  }
}))

const ColoredButton = withStyles(() => ({
  root: {
    color: 'white'
  }
}))(IconButton)

export const ImageGridViewer: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles({})
  const currentGridViewerObjectThumbnail = getCurrentGridViewerObjectThumbnail()
  const image = currentGridViewerObjectThumbnail && buildTileSourceForGridViewerImage(currentGridViewerObjectThumbnail)
  const id = getCurrentGridViewerObjectId()
  const hit = ESCore.state.getHitForId(id)
  const title = hit && (buildHighlightedValueForHit('title', hit) || buildHighlightedValueForHit(Domain.DOC_TITLE_FIELD, hit))
  const dispatch = useAppDispatch()

  const handleRemove = (): void => {
    dispatch(setCurrentGridViewerObject({ gridViewerObject: null }))
  }

  const buildCloseIcon = (): ReactElement => {
    return (
      <div className={classes.closeIcon}>
        <ColoredButton
          aria-label="Remove"
          className={classes.menuButton}
          color="primary"
          edge="start"
          onClick={handleRemove}>
          <Close/>
        </ColoredButton>
      </div>
    )
  }

  return (
    <Grid
      className={classes.flexSection}
      container
    >
      {image
        ? <>
          <Grid className={classes.gridRoot} item xs={7}>
            <ViewTypeSwitcher/>
          </Grid>
          <Grid className={classes.gridViewer} item xs={5}>
            {buildCloseIcon()}
            <SingleImageOSDViewer image={image} key={uuidv4()}/>
            <TitleIdHeader
              id={id}
              title={title}
            />
          </Grid>
        </>
        : <Grid className={classes.gridRoot} item xs={12}>
          <ViewTypeSwitcher/>
        </Grid>
      }
    </Grid>
  )
}
