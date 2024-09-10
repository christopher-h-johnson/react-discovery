import { Container, ImageListItem } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Thumbnail } from '@react-discovery/iiif'
import { IHit } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { useThumbnailStyles } from '.'
import { MediaGridTitleBar } from '../MediaGridTitleBar'

interface IThumbnailGrid {
  hit: IHit;
  id: string;
  item: any;
  manifest: string;
}

export const ThumbnailGrid: React.FC<IThumbnailGrid> = (props): ReactElement => {
  const { hit, id, item, manifest } = props
  const thumbnailClasses: any = useThumbnailStyles({})
  const thumbnail = hit && hit._source && hit._source.thumbnail
  return hit && item
    ? (
    <Grid className={thumbnailClasses.root}>
      <Container maxWidth="xs">
        <ImageListItem
            className={thumbnailClasses.gridList}
        >
          <Thumbnail
            classes={thumbnailClasses}
            id={id}
            manifest={manifest}
            thumbnail={thumbnail}
          />
          <MediaGridTitleBar hit={hit} item={item}/>
        </ImageListItem>
      </Container>
    </Grid>
      )
    : null
}
