import { ImageListItemBar } from '@mui/material'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { InnerHtmlValue } from '@react-discovery/components'
import { IHit, setViewIdMap } from '@react-discovery/internal'
import { AddToWorkspaceButton, Domain } from '@react-discovery/views'
import { getWorkspaceViewIdMap } from '@react-discovery/workspace'
import React, { ReactElement } from 'react'

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
  const classes: any = useStyles({}) || props.classes
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
