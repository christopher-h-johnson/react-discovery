import { ArrowBack } from '@mui/icons-material'
import { Fab, Theme } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import { getCurrentCollection, OSCore, useAppDispatch } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildDocumentUri } from './utils'

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
  const { hitIndex } = props
  const classes: any = useStyles({})
  const dispatch = useAppDispatch()
  const navigation = useNavigate()
  const prevHit = OSCore.state.getHitForIndex(Math.max(0, hitIndex - 1))
  const prevHitId = prevHit && prevHit.id
  const prevHitDocIndex = prevHit && prevHit.index
  const handleGetPrevDoc = (): void => {
    const url = buildDocumentUri(prevHitDocIndex, prevHitId)
    dispatch(OSCore.state.fetchElasticSearchDocument.action({ url }))
    navigation(`/detail/${prevHitDocIndex}/${prevHitId}`)
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
