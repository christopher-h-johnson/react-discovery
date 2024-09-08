import CircularProgress from '@mui/material/CircularProgress'
import { useFacetViewSwitcherStyles } from '@react-discovery/components'
import { getHitComponents, getViewType } from '@react-discovery/configuration'
import { Hits, OSCore } from '@react-discovery/internal'
import React, { ReactElement, Suspense } from 'react'

const CUSTOM_COMPONENT_PATH = './hit-views/'

const buildHitComponent = (props, filterType, hitComponents, viewType): ReactElement => {
  const [defaultHitComponent] = hitComponents.filter((hc): boolean => hc.defaultOption === true)
  const [gridComponent] = hitComponents.filter((hc): boolean => hc.type === 'grid')
  const [facetComponent] = hitComponents.filter((hc): boolean => hc.hitComponent === filterType && hc.expandedView === false)
  const [expandedFacetComponent] = hitComponents.filter((hc): boolean => hc.expandedView === true)
  const hitComponent = viewType === 'expanded'
    ? expandedFacetComponent
    : viewType === 'grid' ? gridComponent : facetComponent || defaultHitComponent
  const Component = React.lazy((): Promise<any> => hitComponent
    ? import(`${CUSTOM_COMPONENT_PATH}${hitComponent.hitComponent}`)
    : import(`${CUSTOM_COMPONENT_PATH}${defaultHitComponent.hitComponent}`))
  const options = {
    ...props,
    hitComponent: Component
  }
  return (<Hits {...options}/>)
}

export const ViewTypeSwitcher: React.FC<any> = (props): ReactElement => {
  const classes: any = useFacetViewSwitcherStyles({})
  const filterType = OSCore.state.getFilterType() || 'Kulturobjekt'
  const hitComponents = getHitComponents()
  const viewType = getViewType()

  return (
    <Suspense fallback={<CircularProgress className={classes.progress}/>}>{
      buildHitComponent(props, filterType, hitComponents, viewType)}</Suspense>
  )
}
