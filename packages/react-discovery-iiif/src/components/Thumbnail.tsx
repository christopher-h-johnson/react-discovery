import { gql, skipToken, useQuery, useSuspenseQuery } from '@apollo/client'
import { CardActionArea, CardMedia } from '@mui/material'
import { useThumbnailStyles } from '@react-discovery/components'
import {
  getCurrentGridViewerObjectThumbnail,
  setCurrentGridViewerObject,
  useAppDispatch
} from '@react-discovery/internal'
import clsx from 'clsx'
import React, { ReactElement } from 'react'
import { buildThumbnailReference } from '../utils'

interface IThumbnail {
  apiVersion?: string;
  classes?: any;
  id: string;
  image?: string;
  index?: string;
  label?: string;
  manifest?: string;
  menuComponent?: ReactElement;
  thumbnail?: string;
}

/* // noinspection GraphQLUnresolvedReference
const GET_THUMBNAIL = gql`
          query Thumbnail($manifestId: String!) {
              manifest(id: $manifestId)
          {thumbnail{id, type, service {id, profile}}}
          }`

// noinspection GraphQLUnresolvedReference
const GET_THUMBNAIL_DESCRIPTORS_V2 = gql`
    query Manifestv2($manifestId: String!) {
        manifestv2(id: $manifestId)
        {label}
    }`

// noinspection GraphQLUnresolvedReference
const GET_THUMBNAIL_DESCRIPTORS = gql`
          query Summary($manifestId: String!) {
              manifest(id: $manifestId)
          {label {en}, summary{en}}
          }` */

export const Thumbnail: React.FC<IThumbnail> = (props): ReactElement => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes: any = props.classes || useThumbnailStyles({})
  const dispatch = useAppDispatch()
  const { apiVersion, id, index, label, manifest, menuComponent, thumbnail } = props
  const currentGridViewerThumbnail = getCurrentGridViewerObjectThumbnail()
  const thumbnailLink = buildThumbnailReference(thumbnail)

  /*  const { data }: any = useSuspenseQuery(GET_THUMBNAIL, !thumbnail && manifest
    ? { variables: { manifestId: manifest } }
    : skipToken)

  const response: any = apiVersion === '3' && manifest
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ? useQuery(GET_THUMBNAIL_DESCRIPTORS, {
      variables: { manifestId: manifest }
    })
    : null

  const { data: data2 }: any = useSuspenseQuery(GET_THUMBNAIL_DESCRIPTORS_V2, manifest
    ? { variables: { manifestId: manifest } }
    : skipToken) */

  const handleImageSelect = (thumbnail): void => {
    dispatch(setCurrentGridViewerObject({ gridViewerObject: { id, index, thumbnail } }))
  }

  const isSelected = (): boolean => {
    return currentGridViewerThumbnail && currentGridViewerThumbnail === thumbnail
  }

  // const isSelectedInThumbnails = (): boolean => {
  //   return data && data.manifest && data.manifest.thumbnail.filter((t): boolean => t.id === currentGridViewerThumbnail).length
  // }
  //
  // return data && response && response.data
  //   ? (
  //   <div className={clsx(classes.cover, { [classes.coverBorder]: isSelectedInThumbnails() })}>
  //     {data.manifest && response.data.manifest
  //       ? data.manifest.thumbnail.map(
  //         (t, i) =>
  //         <CardActionArea
  //           key={i}
  //           onClick={(): void => handleImageSelect(t.id)}
  //         >
  //           <CardMedia
  //             alt="Placeholder"
  //             className={classes.media}
  //             component="img"
  //             image={t.id}
  //             title={response.data.manifest && (response.data.manifest.label || response.data.manifest.summary)}
  //           />
  //         </CardActionArea>)
  //       : null
  //     }
  //     {menuComponent}
  //   </div>
  //     )
  return thumbnail
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
          title={label}
        />
      </CardActionArea>
      {menuComponent}
    </div>
      )
    : null
}
