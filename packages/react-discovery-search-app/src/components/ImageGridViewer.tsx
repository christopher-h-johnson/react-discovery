import { Close } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Grid from '@mui/material/Grid2'
import makeStyles from '@mui/styles/makeStyles'
import withStyles from '@mui/styles/withStyles'
import { buildHighlightedValueForHit, TitleIdHeader } from '@react-discovery/components'
import { buildTileSourceForGridViewerImage, SingleImageOSDViewer } from '@react-discovery/iiif'
import {
  getCurrentGridViewerObjectId,
  getCurrentGridViewerObjectThumbnail,
  OSCore,
  setCurrentGridViewerObject,
  useAppDispatch
} from '@react-discovery/internal'
import { Domain } from '@react-discovery/views'
import React, { ReactElement } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ViewTypeSwitcher } from './ViewTypeSwitcher'

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
    flexWrap: 'wrap'
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

export const ImageGridViewerItem = (classes) => {
  const currentGridViewerObjectThumbnail = getCurrentGridViewerObjectThumbnail()
  const image = currentGridViewerObjectThumbnail && buildTileSourceForGridViewerImage(currentGridViewerObjectThumbnail)
  const id = getCurrentGridViewerObjectId()
  const hit = OSCore.state.getHitForId(id)
  const index = hit && hit.index
  const title = hit && (buildHighlightedValueForHit('Title', hit) || buildHighlightedValueForHit(Domain.DOC_TITLE_FIELD, hit) || buildHighlightedValueForHit('title', hit))
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
    image
      ? <Grid className={classes.gridViewer} size={5}>
          {buildCloseIcon()}
          <SingleImageOSDViewer image={image} key={uuidv4()}/>
          <TitleIdHeader
              id={id}
              index={index}
              title={title}
          />
        </Grid>
      : null
  )
}

export const ImageGridViewer: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles({})

  return (
    <Grid
      className={classes.flexSection}
      container
    >
      <Grid className={classes.gridRoot} size={7}>
        <ViewTypeSwitcher/>
      </Grid>
      {ImageGridViewerItem(classes)}
    </Grid>
  )
}
