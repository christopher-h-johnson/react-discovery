import { Card, CardActions, CardContent, Theme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import {
  buildHighlightedValueForHit,
  FieldValueDisplay,
  getFirstManifestFromHit,
  TitleIdHeader,
  ValueDisplay
} from '@react-discovery/components'
import { getCurrentCollection } from '@react-discovery/configuration'
import { SimpleImageViewer } from '@react-discovery/iiif'
import { OSCore } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import {
  AddToWorkspaceButton,
  ArrowBackButton,
  ArrowForwardButton,
  Domain,
  domainEntitySpec,
  EntityDisplay,
  HitViewOptionsMenu
} from '.'

interface IDetailView {
  actions: any;
  classes?: any;
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
      padding: 20
    },
    imageGrid: {
      height: '50vh',
      minHeight: '50vh',
      width: '100%',
      flexBasis: 0
    },
    osdRoot: {
      background: 'black',
      height: '100%'
    },
    root: {
      backgroundColor: theme.palette.background.paper,
      display: 'flex-root',
      marginBottom: 5,
      padding: 12
    },
    title: {
      color: 'green'
    }
  })
)

export const DetailView: React.FC<IDetailView> = (props): ReactElement => {
  const { getNumberOfWorkspaceNodesForId, getWorkspaceViewIdMap, setViewIdMap } = props.actions
  const addToWorkspaceButtonActions = {
    getWorkspaceViewIdMap, setViewIdMap
  }
  const optionsMenuActions = {
    getNumberOfWorkspaceNodesForId, setViewIdMap
  }
  const classes: any = useStyles({}) || props.classes
  const currentCollection = getCurrentCollection()
  const defaultCollection = process.env.REACT_APP_SEARCH_API_COLLECTION
  const { collection, id } = useParams()
  const numFound = OSCore.state.getNumFound()
  const isSingleton = numFound === 1
  const hitIndex = OSCore.state.getHitIndexForId(id)
  const currentHit = OSCore.state.getHitForIndex(hitIndex)
  const searchFields = OSCore.state.getSearchFields()
  const title = currentHit && (buildHighlightedValueForHit(Domain.DOC_TITLE_FIELD, currentHit) ||
    buildHighlightedValueForHit('title', currentHit))
  const manifest = currentHit && getFirstManifestFromHit(currentHit, Domain.MEDIA)
  const item = {
    [Domain.MEDIA_TITLE_FIELD]: title,
    [Domain.MANIFEST_ID_FIELD]: manifest
  }

  const buildCardActions = (cardActions): ReactElement[] => {
    return cardActions.map((item, i): ReactElement =>
      <CardActions
        disableSpacing
        key={i}
      >
        <EntityDisplay
          displayFields={item.displayFields}
          hit={currentHit}
          isNested={item.isNested}
          nestedDisplayFields={item.nestedDisplayFields}
          type={item.type}
        />
      </CardActions>
    )
  }

  const buildImageViewer = (): ReactElement => {
    return (
      <Grid className={classes.imageGrid} size={6}>
        {manifest ? (<SimpleImageViewer classes={classes} manifest={manifest}/>) : null}
      </Grid>
    )
  }

  const optionsMenu = id && <HitViewOptionsMenu actions={optionsMenuActions} id={id}/>
  const addButton = currentHit && <AddToWorkspaceButton actions={addToWorkspaceButtonActions} classes={classes} hit={currentHit} item={item}/>

  const buildDetailView = (): ReactElement => {
    return (
      <Grid>
        <Card className={classes.root}>
          <TitleIdHeader
            addButton={addButton}
            id={id}
            optionsMenu={optionsMenu}
            title={title}
          />
          <div style={{ display: 'flex' }}>
            <div className={classes.details}>
              <ValueDisplay
                field={Domain.DOC_SUBTITLE_FIELD}
                hit={currentHit}
                style={{ display: 'flex', padding: '10px' }}
                variant='h6'
              />
              {searchFields.map((field, key): ReactElement =>
                <CardContent
                  className={classes.cardContent}
                  key={key}
                >{currentHit._source && currentHit._source[field.field]
                  ? <FieldValueDisplay field={field} hit={currentHit}/>
                  : null}
                </CardContent>)}
              {currentCollection === defaultCollection ? buildCardActions(domainEntitySpec) : null}
            </div>
          </div>
        </Card>
      </Grid>
    )
  }

  return currentHit
    ? (
    <Grid
      container
      key={uuidv4()}
      spacing={3}
    >
      <Grid size='grow'>
       {!isSingleton ? <ArrowBackButton collection={collection} hitIndex={hitIndex}/> : null}
      </Grid>
      <Grid size={6}>
        {buildImageViewer()}
        {buildDetailView()}
      </Grid>
      <Grid size='grow'>
      {!isSingleton ? <ArrowForwardButton collection={collection} hitIndex={hitIndex}/> : null}
      </Grid>
    </Grid>
      )
    : null
}
