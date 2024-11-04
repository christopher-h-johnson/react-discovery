import { SimpleImageViewer } from '@react-discovery/iiif'
import { getCurrentCollection, OSCore, useAppDispatch } from '@react-discovery/internal'
import React, { ReactElement, useEffect } from 'react'
import { buildDocumentUri } from './utils'

interface ISimpleImageView {
  id: string;
  index?: string;
  manifest: string;
}

export const SimpleImageView: React.FC<ISimpleImageView> = (props): ReactElement => {
  const { id, index, manifest } = props
  const dispatch = useAppDispatch()
  const docs = OSCore.state.getDocuments()
  const doc = Object.keys(docs).length ? docs[id] : null
  const url = buildDocumentUri(index, id)

  useEffect((): void => {
    if (!doc) {
      dispatch(OSCore.state.fetchElasticSearchDocument.action({ url }))
    }
  }, [dispatch, doc, url])

  return manifest ? (<SimpleImageViewer manifest={manifest}/>) : null
}
