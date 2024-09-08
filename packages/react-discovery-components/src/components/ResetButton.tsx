import { Loop } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { OSCore, useAppDispatch } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { IOverridableStyledComponent } from '..'

import { useResetButtonStyles } from '../styles'

export const ResetButton: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes: any = props.classes || useResetButtonStyles({})
  const dispatch = useAppDispatch()

  // const currentSearchContext = getCurrentSearchContext()
  const handleChange = (): void => {
    dispatch(OSCore.state.setQueryInput({ stringInput: '' }))
    dispatch(OSCore.state.setFrom({ from: 0 }))
    // navigation.navigate(currentSearchContext)
  }

  return (
    (<IconButton
      className={classes.menuButton}
      color="inherit"
      data-testid='reset'
      href=''
      onClick={handleChange}
      size="large">
      <Loop/>
    </IconButton>)
  )
}
