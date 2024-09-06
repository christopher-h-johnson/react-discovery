import { FlexBox, InnerHtmlValue } from '.'
import { Link, useLocation } from 'react-router-dom'
import React, { ReactElement } from 'react'
import { getCurrentCollection, getCurrentSearchContext, getRootContext } from '@react-discovery/configuration'
import { CardHeader } from '@mui/material'
import { ESCore } from '@react-discovery/core'
import { useAppDispatch } from '@react-discovery/elasticsearch-app'

interface ITitleIdHeader {
  docIndex?: string;
  addButton?: ReactElement;
  optionsMenu?: ReactElement;
  title: string;
  id: string;
}

export const TitleIdHeader: React.FC<ITitleIdHeader> = (props): ReactElement => {
  const { addButton, docIndex, id, optionsMenu, title } = props
  const currentCollection = docIndex || getCurrentCollection()
  const rootContext = getRootContext()
  const docIndexContext = rootContext + '/' + docIndex
  const currentSearchContext = (docIndex && docIndexContext) || getCurrentSearchContext()
  const dispatch = useAppDispatch()
  const route = useLocation()
  const pathname = route.pathname

  const handleIdQuery = () => {
    dispatch(ESCore.state.setQueryInput({ stringInput: id }))
  }

  const buildTitleHeaderForPathName = (): ReactElement => {
    if (pathname === currentSearchContext) {
      return (
        <FlexBox>
          <Link
            data-testid='detail-link'
            to={`/detail/${currentCollection}/${id}`}
          >
            <CardHeader style={{ width: '100%' }} title={<InnerHtmlValue value={title}/>}/>
          </Link>
          <div style={{ flexGrow: 1 }}/>
          {optionsMenu}
        </FlexBox>
      )
    } else {
      return (
        <FlexBox>
          <Link
            to={`${currentSearchContext}?q=${id}`}
            onClick={handleIdQuery}
          >
            <CardHeader style={{ width: '100%' }} title={<InnerHtmlValue value={title}/>}/>
          </Link>
          <div style={{ flexGrow: 1 }}/>
          {addButton}
          {optionsMenu}
        </FlexBox>
      )
    }
  }

  return (
    buildTitleHeaderForPathName()
  )
}
