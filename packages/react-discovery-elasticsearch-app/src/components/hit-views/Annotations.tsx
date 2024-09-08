import { CardActions } from '@mui/material'
import { IHit } from '@react-discovery/internal'
import { annotationDisplayFields, Domain, EntityDisplay } from '@react-discovery/views'
import React, { ReactElement } from 'react'

interface IAnnotations {
  hit: IHit;
}

export const Annotations: React.FC<IAnnotations> = (props): ReactElement => {
  const { hit } = props
  const cardActions = [
    {
      displayFields: annotationDisplayFields,
      isNested: false,
      nestedDisplayFields: null,
      type: Domain.ANNOTATION
    }
  ]

  const buildCardActions = (cardActions): ReactElement[] => {
    return cardActions.map((item, i): ReactElement =>
      <CardActions
        disableSpacing
        key={i}
      >
        <EntityDisplay
          displayFields={item.displayFields}
          hit={hit} isNested={item.isNested}
          nestedDisplayFields={item.nestedDisplayFields}
          type={item.type}
        />
      </CardActions>
    )
  }

  return (
    <>
      {buildCardActions(cardActions)}
    </>
  )
}
