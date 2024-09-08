import { WindowAppBar } from '@react-discovery/iiif'
import { MosaicWorkspace } from '@react-discovery/workspace'
import React, { ReactElement } from 'react'

export const Workspace: React.FC<any> = (): ReactElement => {
  return (
    <MosaicWorkspace
      windowAppBar={WindowAppBar}
    />
  )
}
