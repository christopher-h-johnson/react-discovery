import { Card, CardContent } from '@mui/material'
import Grid from '@mui/material/Grid2'

import {
  buildHighlightedValueForHit,
  FieldValueDisplay,
  getFirstManifestFromHit,
  TitleIdHeader
} from '@react-discovery/components'
import { IHit, OSCore, setViewIdMap } from '@react-discovery/internal'
import { Domain, HitViewOptionsMenu, useHitViewStyles } from '@react-discovery/views'
import { getNumberOfWorkspaceNodesForId } from '@react-discovery/workspace'
import React, { ReactElement } from 'react'
import { ThumbnailGrid } from './ThumbnailGrid'

interface IDefaultItemComponent {
  hit: IHit;
  i?: number;
}

const DefaultHitComponent: React.FC<IDefaultItemComponent> = (props: IDefaultItemComponent): ReactElement => {
  const optionsMenuActions = {
    getNumberOfWorkspaceNodesForId, setViewIdMap
  }
  const classes: any = useHitViewStyles({})
  const searchFields = OSCore.state.getSearchFields()
  const { hit, i } = props
  const id = hit && (hit._source.id || hit.id)
  const index = hit && hit.index
  const title = buildHighlightedValueForHit('Title', hit)
  const manifest = hit && getFirstManifestFromHit(hit, Domain.MEDIA)
  const optionsMenu = id && <HitViewOptionsMenu actions={optionsMenuActions} id={id}/>
  const item = {
    [Domain.MEDIA_TITLE_FIELD]: title,
    [Domain.MANIFEST_ID_FIELD]: manifest
  }
  return (
    (<Card className={classes.root} key={i}>
      <Grid
        container
        justifyContent="space-between"
      >
        <Grid
          style={{ marginTop: 10 }}
          size={8}
        >
          <TitleIdHeader
            id={id}
            optionsMenu={optionsMenu}
            title={title}
          />
          <div style={{ display: 'flex' }}>
            <div className={classes.details}>
              {searchFields.map((field, key): ReactElement =>
                <CardContent
                  className={classes.content}
                  key={key}
                >{hit._source && hit._source[field.field]
                  ? <FieldValueDisplay field={field} hit={hit}/>
                  : null}
                </CardContent>)}
            </div>
          </div>
        </Grid>
        <ThumbnailGrid hit={hit} id={id} index={index} item={item} manifest={manifest}/>
      </Grid>
    </Card>)
  )
}

export default DefaultHitComponent
