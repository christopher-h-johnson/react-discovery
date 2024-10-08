import { getRefinementListFilters } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { IOverridableStyledComponent } from '..'
import { ItemList } from './ItemList'

export const RefinementListFilters: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  const { classes } = props
  const refinementListFilters = getRefinementListFilters()
  const { t } = useTranslation(['common', 'vocab'])
  const buildRefinementListFilters = (): ReactElement[] => {
    return Object.keys(refinementListFilters).map((id: any): ReactElement => (
      <ItemList
        classes={classes}
        field={refinementListFilters[id].field}
        key={id}
        label={t(`vocab:${refinementListFilters[id].label}`)}/>))
  }
  return (
    <>
    {buildRefinementListFilters()}
    </>)
}
