import { CardHeader } from '@mui/material'
import {
  getCurrentCollection,
  getCurrentSearchContext,
  getRootContext,
  OSCore,
  useAppDispatch
} from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FlexBox, InnerHtmlValue } from '.'

interface ITitleIdHeader {
  docIndex?: string;
  addButton?: ReactElement;
  optionsMenu?: ReactElement;
  title: string;
  id: string;
  index?: string;
}

export const TitleIdHeader: React.FC<ITitleIdHeader> = (props): ReactElement => {
  const { addButton, docIndex, id, index, optionsMenu, title } = props
  const rootContext = getRootContext()
  const docIndexContext = rootContext + '/' + docIndex
  const currentSearchContext = (docIndex && docIndexContext) || getCurrentSearchContext()
  const dispatch = useAppDispatch()
  const route = useLocation()
  const pathname = route.pathname

  const handleIdQuery = () => {
    dispatch(OSCore.state.setQueryInput({ stringInput: id }))
  }

  const buildTitleHeaderForPathName = (): ReactElement => {
    if (pathname === currentSearchContext || pathname.includes('global')) {
      return (
        <FlexBox>
          <Link
            data-testid='detail-link'
            to={`/detail/${index}/${id}`}
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
