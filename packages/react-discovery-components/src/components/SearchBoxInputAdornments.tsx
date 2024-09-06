import { Clear, Search } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material'
import React, { ReactElement } from 'react'

export const StartAdornment = (): ReactElement => {
  return (
    <InputAdornment position="start">
      <Search />
    </InputAdornment>
  )
}

export const EndAdornment = (props): ReactElement => {
  return (
    (<InputAdornment position="end">
      <IconButton
        data-testid='clear-searchbox'
        href=''
        onClick={props.onClick}
        size="large">
        <Clear />
      </IconButton>
    </InputAdornment>)
  );
}

export const SearchIconButton = (props): ReactElement => {
  return (
    (<IconButton edge="end" href='' onClick={props.onClick} size="large">
      <Search/>
    </IconButton>)
  );
}
