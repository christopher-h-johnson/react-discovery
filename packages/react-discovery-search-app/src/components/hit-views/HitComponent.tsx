import { getViewType } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import DefaultHitComponent from './DefaultHitComponent'
import GridComponent from './GridComponent'

const HitComponent: React.FC<any> = (props): ReactElement => {
  const viewType = getViewType() || 'grid'

  const buildComponentForViewType = (props): ReactElement => {
    switch (viewType) {
      case 'grid':
        return <GridComponent {...props} />
      case 'list':
        return <DefaultHitComponent {...props}/>
      default:
        return <GridComponent {...props}/>
    }
  }
  return buildComponentForViewType(props)
}

export default HitComponent
