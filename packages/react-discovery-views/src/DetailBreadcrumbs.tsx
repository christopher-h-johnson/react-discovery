import { Breadcrumbs, Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import { ESCore } from '@react-discovery/core'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '@react-discovery/elasticsearch-app'
import { useTranslation } from 'react-i18next'

export const DetailBreadcrumbs: React.FC<any> = (): ReactElement => {
  const { t } = useTranslation('vocab')
  const dispatch = useAppDispatch()

  const handleClick = () => {
    const filters = []
    dispatch(ESCore.state.setQueryInput({ stringInput: null }))
    dispatch(ESCore.state.setFrom({ from: 0 }))
    dispatch(ESCore.state.setSelectedFilters({ field: 'type_s', filters }))
  }

  return (
    <Breadcrumbs
      aria-label="search"
      component='nav'
    >
      <Link
        data-testid='detail-search-link'
        to ='/'
        onClick={handleClick}
      >
        {t('search')}
      </Link>
      <Link
        data-testid='detail-result-link'
        to ='/'
      >
        {t('result')}
      </Link>
      <Typography color="textPrimary" style={{ display: 'flex' }}>
        {t('details')}
      </Typography>
    </Breadcrumbs>
  )
}
