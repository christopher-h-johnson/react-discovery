import { AddToWorkspaceButton, Domain } from '@react-discovery/views'
import { ImageListItemBar } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React, { ReactElement } from 'react'
import { getWorkspaceViewIdMap, setViewIdMap } from '@react-discovery/workspace'
import { IHit } from '@react-discovery/core'
import { InnerHtmlValue } from '@react-discovery/components'
import { Theme } from '@mui/material/styles'

interface IImageGridListTitleBar {
  classes?: any;
  hit: IHit;
  item: any;
}

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme): any => ({
  title: {
    color: theme.palette.common.white
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, #00102d 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
}))

export const MediaGridTitleBar: React.FC<IImageGridListTitleBar> = (props): ReactElement => {
  const classes: any = props.classes || useStyles({})
  const { hit, item } = props
  const addToWorkspaceButtonActions = { getWorkspaceViewIdMap, setViewIdMap }

  const buildGridListTitleBar = (item): ReactElement => {
    return (
      <ImageListItemBar
          actionIcon={<AddToWorkspaceButton actions={addToWorkspaceButtonActions} hit={hit} item={item}/>
        }
        actionPosition="right"
        classes={{
          root: classes.titleBar,
          title: classes.title
        }}
        title={<InnerHtmlValue value={item[Domain.MEDIA_TITLE_FIELD]}/>}
        position='top'
      />
    )
  }

  return (<>{buildGridListTitleBar(item)}</>)
}
