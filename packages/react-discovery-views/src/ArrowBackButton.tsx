import { Fab, Theme } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import React, { ReactElement } from 'react'
import { ArrowBack } from '@mui/icons-material'
import { ESCore } from '@react-discovery/core'
import { buildDocumentUri } from './utils'
import { getCurrentCollection } from '@react-discovery/configuration'
import { useAppDispatch } from '@react-discovery/elasticsearch-app'
import { useNavigate } from 'react-router-dom'
interface IArrowBackButton {
  collection: string;
  hitIndex: number;
}

const useStyles = makeStyles((theme: Theme): any =>
  createStyles({
    prevItem: {
      left: 84,
      margin: theme.spacing(1),
      position: 'absolute',
      top: 'calc(30vh + 93px)'
    }
  })
)

export const ArrowBackButton: React.FC<IArrowBackButton> = (props): ReactElement => {
  const { collection, hitIndex } = props
  const classes: any = useStyles({})
  const currentCollection = getCurrentCollection()
  const dispatch = useAppDispatch()
  const navigation = useNavigate()
  const prevHit = ESCore.state.getHitForIndex(Math.max(0, hitIndex - 1))
  const prevHitId = prevHit && prevHit.id

  const handleGetPrevDoc = (): void => {
    const url = buildDocumentUri(collection, prevHitId)
    dispatch(ESCore.state.fetchElasticSearchDocument.action({ url }))
    navigation(`/detail/${currentCollection}/${prevHitId}`)
  }

  return (
    <Fab
      aria-label="back"
      classes={{ root: classes.prevItem }}
      href=''
      onClick={handleGetPrevDoc}
    >
      <ArrowBack/>
    </Fab>
  )
}
