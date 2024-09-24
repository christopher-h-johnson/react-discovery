import { ImageListItem } from '@mui/material'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { Thumbnail } from '@react-discovery/iiif'
import { OSCore } from '@react-discovery/internal'
import { Domain } from '@react-discovery/views'
import React, { ReactElement } from 'react'
import { MediaGridTitleBar } from './MediaGridTitleBar'

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme): any => ({
  cover: {
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    padding: 36
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)'
  },
  gridListTile: {
    listStyle: 'none'
  },
  icon: {
    color: 'white'
  },
  media: {
    borderRadius: 8,
    maxWidth: 180,
    objectFit: 'cover'
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  title: {
    color: theme.palette.common.white
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
}))

const typeField = OSCore.enums.FieldConstants.TYPE_FIELD

export const MediaGrid: React.FC<any> = (props): ReactElement => {
  const classes: any = useStyles({})
  const { hit } = props
  const id = hit && hit._source.id
  const entities = hit && hit._source.entities && hit._source.entities
  const media = entities && entities.filter((entity): boolean => entity[typeField] === Domain.MEDIA)
  const thumbnail = hit && hit._source && hit._source.thumbnail
  const label = hit && hit._source && (hit._source.label || hit._source['Full Title'])

  const buildMediaGrid = (): ReactElement[] => {
    return media.map((item, i): ReactElement => (
      <ImageListItem
        className={classes.gridListTile}
        key={i}
      >
        <Thumbnail
          classes={classes}
          id={id}
          label={label}
          manifest={item[Domain.MANIFEST_ID_FIELD]}
          thumbnail={thumbnail}
        />
        <MediaGridTitleBar
          hit={hit}
          item={item}
        />
      </ImageListItem>
    ))
  }

  return (
    <div className={classes.root}>{buildMediaGrid()}</div>
  )
}
