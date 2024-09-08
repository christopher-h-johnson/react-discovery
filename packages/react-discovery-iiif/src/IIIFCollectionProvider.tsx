import { setCurrentManifestCollection, useAppDispatch } from '@react-discovery/internal'
import React, { ReactElement, useEffect, useState } from 'react'
// @ts-ignore
import data from './__test__/fixtures/oxford.json'

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
    [dispatch, isInitialized]
  )

  return (<>{props.children}</>)
}
