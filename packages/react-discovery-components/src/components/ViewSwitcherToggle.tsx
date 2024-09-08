import { GridOn, UnfoldLess, UnfoldMore } from '@mui/icons-material'
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'
import { getViewType, setViewType, useAppDispatch } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

export const ViewSwitcherToggle: React.FC<any> = (): ReactElement => {
  const dispatch = useAppDispatch()
  const viewType = getViewType() || 'compact'
  const { t } = useTranslation()

  // eslint-disable-next-line no-empty-pattern
  const handleChange = ({}, viewType): void => {
    dispatch(setViewType({ viewType }))
  }

  return (
    <ToggleButtonGroup value={viewType} exclusive onChange={handleChange}>
      <ToggleButton value="compact">
        <Tooltip title={t('unfoldLess')}>
          <UnfoldLess/>
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="expanded">
        <Tooltip title={t('unfoldMore')}>
          <UnfoldMore/>
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="grid">
        <Tooltip title={t('grid')}>
          <GridOn/>
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
