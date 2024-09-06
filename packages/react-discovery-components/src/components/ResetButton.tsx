import React, { ReactElement } from 'react'
import { ESCore } from '@react-discovery/core'
import { IOverridableStyledComponent } from '..'
import { IconButton } from '@mui/material'
import { Loop } from '@mui/icons-material'
import { useAppDispatch } from '@react-discovery/elasticsearch-app'

import { useResetButtonStyles } from '../styles'

export const ResetButton: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  const classes: any = props.classes || useResetButtonStyles({})
  const dispatch = useAppDispatch()

  // const currentSearchContext = getCurrentSearchContext()
  const handleChange = (): void => {
    dispatch(ESCore.state.setQueryInput({ stringInput: '' }))
    dispatch(ESCore.state.setFrom({ from: 0 }))
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
  );
}
