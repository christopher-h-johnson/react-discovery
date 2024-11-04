import { ArrowForward } from '@mui/icons-material'
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
    nextItem: {
      margin: theme.spacing(1),
      position: 'absolute',
      right: 24,
      top: 'calc(30vh + 93px)'
    }
  })
)

export const ArrowForwardButton: React.FC<IArrowBackButton> = (props): ReactElement => {
  const { collection, hitIndex } = props
  const classes: any = useStyles({})
  const navigation = useNavigate()
  const numFound = OSCore.state.getNumFound()

  const size = OSCore.state.getSize()
  const indexConstraint = Math.min(numFound, size) - 1
  const nextIndex = hitIndex + 1 <= indexConstraint ? hitIndex + 1 : indexConstraint
  const nextHit = OSCore.state.getHitForIndex(nextIndex)
  const nextHitId = nextHit && nextHit.id
  const nextHitDocIndex = nextHit && nextHit.index
  const dispatch = useAppDispatch()

  const handleGetNextDoc = (): void => {
    const url = buildDocumentUri(nextHitDocIndex, nextHitId)
    dispatch(OSCore.state.fetchElasticSearchDocument.action({ url }))
    navigation(`/detail/${nextHitDocIndex}/${nextHitId}`)
  }

  return (
    <Fab
      aria-label="next"
      classes={{ root: classes.nextItem }}
      href=''
      onClick={handleGetNextDoc}
    >
      <ArrowForward/>
    </Fab>
  )
}
