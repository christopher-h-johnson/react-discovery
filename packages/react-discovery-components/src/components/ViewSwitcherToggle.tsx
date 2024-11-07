import { GridOn, Toc } from '@mui/icons-material'
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'
import { getViewType, setViewType, useAppDispatch } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

export const ViewSwitcherToggle: React.FC<any> = (): ReactElement => {
  const dispatch = useAppDispatch()
  const viewType = getViewType() || 'compact'
  const { t } = useTranslation()

  // eslint-disable-next-line no-empty-pattern
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    viewType: string | null
  ) => {
    if (viewType != null) {
      dispatch(setViewType({ viewType }))
    }
  }

  return (
    <ToggleButtonGroup value={viewType} exclusive onChange={handleChange}>
      <ToggleButton value="list">
        <Tooltip title={t('list')}>
          <Toc/>
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
