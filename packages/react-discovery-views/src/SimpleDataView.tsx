import { Card, CardActions, CardContent, Theme } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import {
    buildHighlightedValueForHit,
    FieldValueDisplay,
    getFirstManifestFromHit,
    TitleIdHeader,
    ValueDisplay
} from '@react-discovery/components'
import { getCollectionByKey, getCurrentCollection } from '@react-discovery/configuration'
import { Thumbnail } from '@react-discovery/iiif'
import { OSCore, useAppDispatch } from '@react-discovery/internal'
import React, { ReactElement, useEffect } from 'react'
import { buildDocumentUri, Domain, domainEntitySpec, EntityDisplay } from '.'

interface ISimpleDataView {
  id: string;
}

const useStyles = makeStyles((theme: Theme): any =>
  createStyles({
    cardContent: {
      display: 'flex',
      flex: '1 0 auto',
      padding: 0
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      wordBreak: 'break-word'
    },
    root: {
      backgroundColor: theme.palette.background.paper,
      display: 'flex-root',
      marginBottom: '5px'
    }
  })
)

export const SimpleDataView: React.FC<ISimpleDataView> = (props): ReactElement => {
  const classes: any = useStyles({})
  const { id } = props
  const defaultCollection = process.env.REACT_APP_SEARCH_API_COLLECTION
  const dispatch = useAppDispatch()
  const docs = OSCore.state.getDocuments()
  const doc = Object.keys(docs).length ? docs[id] : null
  const docIndex = doc && doc._index
  const currentCollectionObj = getCollectionByKey(docIndex)
  const currentCollection = getCurrentCollection()
  const url = buildDocumentUri(currentCollection, id)
  const searchFields = currentCollectionObj && currentCollectionObj.searchFields
  const title = doc && (buildHighlightedValueForHit(Domain.DOC_TITLE_FIELD, doc) || buildHighlightedValueForHit('title', doc))
  const manifest = doc && getFirstManifestFromHit(doc, Domain.MEDIA)
  const thumbnail = doc && doc._source && doc._source.thumbnail

  useEffect((): void => {
    if (id && !doc) {
      dispatch(OSCore.state.fetchElasticSearchDocument.action({ url }))
    }
  }, [doc])

  const buildCardActions = (cardActions): ReactElement[] => {
    return cardActions.map((item, i): ReactElement =>
      <CardActions
        disableSpacing
        key={i}
      >
        <EntityDisplay
          displayFields={item.displayFields}
          hit={doc}
          isNested={item.isNested}
          nestedDisplayFields={item.nestedDisplayFields}
          type={item.type}
        />
      </CardActions>
    )
  }

  const buildKulturObjekt = (): ReactElement => {
    return (
      <Card className={classes.root}>
        <TitleIdHeader
          docIndex={docIndex}
          id={id}
          title={title}
        />
        <div style={{ display: 'flex' }}>
          <Thumbnail
            id={id}
            manifest={manifest}
            thumbnail={thumbnail}
          />
          <div className={classes.details}>
            <ValueDisplay
              field={Domain.DOC_SUBTITLE_FIELD}
              hit={doc}
              style={{ display: 'flex', padding: '10px' }}
              variant='h6'
            />
            {searchFields.map((field, key): ReactElement =>
              <CardContent
                className={classes.cardContent}
                key={key}
              >{doc._source && doc._source[field.field]
                ? <FieldValueDisplay field={field} hit={doc}/>
                : null}
              </CardContent>)}
            {docIndex === defaultCollection ? buildCardActions(domainEntitySpec) : null}
          </div>
        </div>
      </Card>
    )
  }

  return docs && doc && searchFields
    ? (
        buildKulturObjekt()
      )
    : null
}
