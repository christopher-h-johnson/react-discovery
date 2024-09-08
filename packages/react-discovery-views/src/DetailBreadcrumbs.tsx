import { Breadcrumbs, Typography } from '@mui/material'
import { OSCore, useAppDispatch } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const DetailBreadcrumbs: React.FC<any> = (): ReactElement => {
  const { t } = useTranslation('vocab')
  const dispatch = useAppDispatch()

  const handleClick = () => {
    const filters = []
    dispatch(OSCore.state.setQueryInput({ stringInput: null }))
    dispatch(OSCore.state.setFrom({ from: 0 }))
    dispatch(OSCore.state.setSelectedFilters({ field: 'type_s', filters }))
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
