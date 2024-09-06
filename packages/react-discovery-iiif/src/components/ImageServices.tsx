import React, { ReactElement } from 'react'
import { OSDViewer } from '.'
import { buildTileSources } from '../utils'
import makeStyles from '@mui/styles/makeStyles'
import { gql, useQuery } from '@apollo/client'

interface IImageServices {
  classes?: any;
  manifest: string;
}

export const useThumbnailStyles = makeStyles((): any => ({
  cover: {
    flexShrink: 0,
    padding: 20
  }
}))

// noinspection GraphQLUnresolvedReference
const GET_IMAGE_SERVICES = gql`
          query ImageServices($manifestId: String!, $type: String!) {
            imageServices(manifestId: $manifestId, 
            type: $type)
            {id, type, profile}
          }`

// noinspection GraphQLUnresolvedReference
const GET_IMAGE_SERVICES_V2 = gql`
          query ImageServicesv2NoProfile($manifestId: String!) {
            imageServicesv2NoProfile(manifestId: $manifestId)
            {id}
          }`

export const ImageServices: React.FC<IImageServices> = (props): ReactElement => {
  const { classes, manifest } = props
  const response = manifest && useQuery(GET_IMAGE_SERVICES, {
    variables: { manifestId: manifest, type: 'ImageService2' }
  })
  const responsev2 = manifest && useQuery(GET_IMAGE_SERVICES_V2, {
    variables: { manifestId: manifest }
  })

  const imageServices = response && response.data && response.data.imageServices

  const imageServicesv2 = responsev2 && responsev2.data && responsev2.data.imageServicesv2NoProfile
  if ((response && response.loading) || (responsev2 && responsev2.loading)) return <p>Loading ...</p>
  return imageServices
    ? (
    <OSDViewer
      classes={classes}
      images={buildTileSources(imageServices)}
    />
      )
    : imageServicesv2
      ? (
    <OSDViewer
      classes={classes}
      images={buildTileSources(imageServicesv2)}
    />
        )
      : null
}
