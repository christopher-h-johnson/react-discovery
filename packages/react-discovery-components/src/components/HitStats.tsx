import { Box, Typography } from '@mui/material'
import { getCollectionByKey, getCurrentCollection, OSCore } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

export const HitStats: React.FC<any> = (): ReactElement => {
  const numFound = OSCore.state.getNumFound()
  const currentCollection = getCurrentCollection()
  const currentCollectionObj = getCollectionByKey(currentCollection)
  const { t } = useTranslation()
  return (
    <Box
      data-testid='hit-stats'
      style={{ flex: 'auto' }}>
      <Typography>
        {numFound} {t('resultsFound')} in {currentCollectionObj.name}
      </Typography>
    </Box>
  )
}
