import { CardContent } from '@mui/material'
import { FieldValueDisplay } from '@react-discovery/components'
import { getHitComponentConfig, IHit, OSCore } from '@react-discovery/internal'
import { Domain, useHitViewStyles } from '@react-discovery/views'
import React, { ReactElement } from 'react'

interface IInfo {
  hit: IHit;
}

export const Info: React.FC<IInfo> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const componentConfig = getHitComponentConfig(Domain.INFO)
  const filteredFields = componentConfig && componentConfig.filteredFields
  const searchFields = OSCore.state.getSearchFields()
  const { hit } = props
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))

  return (
    <>
      {
        displayFields.map((field, key): ReactElement =>
          <CardContent
            className={classes.content}
            key={key}
          >{hit._source && hit._source[field.field]
            ? <FieldValueDisplay field={field} hit={hit}/>
            : null}
          </CardContent>)
      }
      </>
  )
}
