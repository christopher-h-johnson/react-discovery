import { SimpleDataView, SimpleImageView } from '@react-discovery/views'
import React, { ReactElement } from 'react'

type ViewType = 'data' | 'image'

interface IView {
  id: string;
  index?: string;
  manifest?: string;
  viewType: ViewType;
}

const View: React.FC<IView> = (props): ReactElement => {
  const { id, index, manifest, viewType } = props

  const buildViewForType = (): ReactElement => {
    switch (viewType) {
      case 'data':
        return <SimpleDataView id={id} index={index} />
      case 'image':
        return <SimpleImageView id={id} index={index} manifest={manifest}/>
      default:
        return <SimpleDataView id={id} index={index}/>
    }
  }
  return buildViewForType()
}

export default View
