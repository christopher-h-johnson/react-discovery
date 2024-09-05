import { Divider, InputBase, Paper } from '@mui/material'
import { EndAdornment, SearchIconButton } from './SearchBoxInputAdornments'
import React, { ReactElement } from 'react'
import { getCurrentSearchContext, setSelectedIndex } from '@react-discovery/configuration'
import { useLocation, useNavigate } from 'react-router-dom'
import { ESCore } from '@react-discovery/core'
import { useSearchBoxStyles } from '../styles'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@react-discovery/elasticsearch-app'

export const SearchBox: React.FC<any> = (): ReactElement => {
  const { t } = useTranslation()
  const classes: any = useSearchBoxStyles({})
  const currentSearchContext = getCurrentSearchContext()
  const dispatch = useAppDispatch()
  const [values, setValues] = React.useState('')
  const navigation = useNavigate()
  const route = useLocation()
  const pathname = route.pathname

  const handleChange = (e): void => {
    setValues(e.target.value)
  }

  const handleClear = (): void => {
    setValues('')
    dispatch(ESCore.state.setQueryInput({ stringInput: null }))
  }

  const handleSubmit = (e): void => {
    e.preventDefault()
    if (pathname !== currentSearchContext) {
      navigation(currentSearchContext)
    }
    dispatch(ESCore.state.setQueryInput({ stringInput: values }))
    dispatch(setSelectedIndex({ selectedIndex: 0 }))
    dispatch(ESCore.state.setFrom({ from: 0 }))
  }

  return (
    <form
      autoComplete="off"
      className={classes.container}
      data-testid='standard-searchform'
      noValidate
      onSubmit={handleSubmit}
    >
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          fullWidth
          placeholder={t('search')}
          id="standard-full-width"
          onChange={handleChange}
          type="search"
          value={values}
        />
        {values
          ? <>
          <EndAdornment onClick={handleClear}/>

          </>
          : null
        }
        <Divider className={classes.divider} />
        <SearchIconButton onClick={handleSubmit}/>
      </Paper>
    </form>
  )
}
