import { Shuffle } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { OSCore, setFrom, useAppDispatch } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { IOverridableStyledComponent } from '..'
import { useResetButtonStyles } from '../styles'

export const RandomizerButton: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  const { t } = useTranslation('common')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes: any = props.classes || useResetButtonStyles({})
  const dispatch = useAppDispatch()
  const numFound = OSCore.state.getNumFound()
  const size = OSCore.state.getSize()
  let maxFound: number
  (numFound >= 10000) ? maxFound = 10000 : maxFound = numFound
  const maxPages = Math.ceil(maxFound / size)

  const handleChange = (): void => {
    const randomFrom = (Math.floor(Math.random() * (maxPages - 1) + 1) + 1) * size
    dispatch(setFrom({ from: randomFrom }))
  }

  return (
    (
      <Tooltip
        title={t('Randomize')}>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            data-testid='reset'
            href=''
            onClick={handleChange}
            size="large">
          <Shuffle/>
        </IconButton>
      </Tooltip>)
  )
}
