import { gql, skipToken, useSuspenseQuery } from '@apollo/client'
import { CircularProgress } from '@mui/material'
import React, { ReactElement, Suspense } from 'react'
import { OSDViewer } from '.'
import { buildTileSources } from '../utils'

interface IImageServices {
  classes?: any;
  manifest: string;
}

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
  const response: any = useSuspenseQuery(GET_IMAGE_SERVICES, manifest
    ? { variables: { manifestId: manifest, type: 'ImageService2' } }
    : skipToken)

  const responsev2: any = useSuspenseQuery(GET_IMAGE_SERVICES_V2, manifest
    ? { variables: { manifestId: manifest } }
    : skipToken)

  const imageServices = response && response.data && response.data.imageServices

  const imageServicesv2 = responsev2 && responsev2.data && responsev2.data.imageServicesv2NoProfile

  return imageServices
    ? (
        <Suspense fallback={<CircularProgress/>}>
          <OSDViewer
            classes={classes}
            images={buildTileSources(imageServices)}
          />
        </Suspense>
      )
    : imageServicesv2
      ? (
       <Suspense fallback={<CircularProgress/>}>
          <OSDViewer
            classes={classes}
            images={buildTileSources(imageServicesv2)}
          />
       </Suspense>
        )
      : null
}
