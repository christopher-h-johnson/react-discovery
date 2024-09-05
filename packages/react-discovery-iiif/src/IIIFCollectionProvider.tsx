import React, { ReactElement, useEffect, useState } from 'react'
// @ts-ignore
import data from './__test__/fixtures/oxford.json'
import { setCurrentManifestCollection } from '.'
import { useAppDispatch } from '@react-discovery/elasticsearch-app'

export const IIIFCollectionProvider: React.FC<any> = (props): ReactElement => {
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(
    () => {
      if (!isInitialized) {
        dispatch(setCurrentManifestCollection({ collection: data }))
        setIsInitialized(true)
      }
    },
    [data]
  )

  return (<>{props.children}</>)
}
