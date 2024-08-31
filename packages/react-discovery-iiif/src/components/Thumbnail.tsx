import { CardActionArea, CardMedia } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { getCurrentGridViewerObjectThumbnail, setCurrentGridViewerObject } from '@react-discovery/configuration'
import { buildThumbnailReference } from '../utils'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { gql, useQuery } from '@apollo/client'
import { useThumbnailStyles } from '@react-discovery/components'

interface IThumbnail {
  classes?: any;
  id: string;
  image?: string;
  manifest?: string;
  menuComponent?: ReactElement;
  thumbnail?: string;
}

// noinspection GraphQLUnresolvedReference
const GET_THUMBNAIL = gql`
          query Thumbnail($manifestId: String!) {
              manifest(id: $manifestId)
          {thumbnail{id, type, service {id, profile}}}
          }`

// noinspection GraphQLUnresolvedReference
// const GET_THUMBNAIL_DESCRIPTORS = gql`
//           query Summary($manifestId: String!) {
//               manifest(id: $manifestId)
//           {label {en}, summary{en}}
//           }`

// noinspection GraphQLUnresolvedReference
const GET_THUMBNAIL_DESCRIPTORS_V2 = gql`
    query Manifestv2($manifestId: String!) {
        manifestv2(id: $manifestId)
        {label}
    }`

export const Thumbnail: React.FC<IThumbnail> = (props): ReactElement => {
  const classes: any = props.classes || useThumbnailStyles({})
  const dispatch = useDispatch()
  const { id, manifest, menuComponent, thumbnail } = props
  const currentGridViewerThumbnail = getCurrentGridViewerObjectThumbnail()
  const thumbnailLink = buildThumbnailReference(thumbnail)
  const { data } = !thumbnail && manifest && useQuery(GET_THUMBNAIL, {
    variables: { manifestId: manifest }
  })
  const { data: dataS } = manifest && useQuery(GET_THUMBNAIL_DESCRIPTORS_V2, {
    variables: { manifestId: manifest }
  })

  // const { data: data2 } = manifest && useQuery(GET_THUMBNAIL_DESCRIPTORS_V2, {
  //   variables: { manifestId: manifest }
  // })

  const handleImageSelect = (thumbnail): void => {
    dispatch(setCurrentGridViewerObject({ gridViewerObject: { id, thumbnail } }))
  }

  const isSelected = (): boolean => {
    return currentGridViewerThumbnail && currentGridViewerThumbnail === thumbnail
  }

  const isSelectedInThumbnails = (): boolean => {
    return data && data.manifest && data.manifest.thumbnail.filter((t): boolean => t.id === currentGridViewerThumbnail).length
  }

  return data && dataS
    ? (
    <div className={clsx(classes.cover, { [classes.coverBorder]: isSelectedInThumbnails() })}>
      {data.manifest && dataS.manifest
        ? data.manifest.thumbnail.map(
          (t, i) =>
          <CardActionArea
            key={i}
            onClick={(): void => handleImageSelect(t.id)}
          >
            <CardMedia
              alt="Placeholder"
              className={classes.media}
              component="img"
              image={t.id}
              title={dataS.manifest && (dataS.manifest.label || dataS.manifest.summary)}
            />
          </CardActionArea>)
        : null
      }
      {menuComponent}
    </div>
      )
    : thumbnail && dataS
      ? (
    <div className={clsx(classes.cover, { [classes.coverBorder]: isSelected() })}>
      <CardActionArea
        onClick={(): void => handleImageSelect(thumbnail)}
      >
        <CardMedia
          alt="Placeholder"
          className={classes.media}
          component="img"
          image={thumbnailLink}
          title={dataS.manifest && (dataS.manifest.label || dataS.manifest.summary)}
        />
      </CardActionArea>
      {menuComponent}
    </div>
        )
      : null
}
