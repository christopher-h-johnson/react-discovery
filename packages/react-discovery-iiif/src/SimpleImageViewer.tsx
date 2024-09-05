import React, { ReactElement, useEffect, useState } from 'react'
import { ImageServices } from '.'
import { usePrevious } from '@react-discovery/elasticsearch-app'

interface ISimpleImageViewer {
  classes?: any;
  manifest: string;
}

export const SimpleImageViewer: React.FC<ISimpleImageViewer> = (props): ReactElement => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [currentManifest, setCurrentManifest] = useState(undefined)
  const { classes, manifest } = props
  const prevManifest = usePrevious(manifest)

  useEffect((): void => {
    setIsInitialized(true)
    setCurrentManifest(manifest)
  }, [manifest])

  return (!isInitialized && manifest !== prevManifest)
    ? (
        <ImageServices classes={classes} manifest={currentManifest}/>
      )
    : (
        <ImageServices classes={classes} manifest={prevManifest}/>
      )
}
