import { Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { useFieldLabelStyles } from '../styles'

interface IFieldLabel {
  classes?: any;
  label: string;
}

export const FieldLabel: React.FC<IFieldLabel> = (props): ReactElement => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes: any = props.classes || useFieldLabelStyles({})
  const { t } = useTranslation('vocab')
  const { label } = props
  return (
    <div className={classes.fieldLabel}>
      <Typography
        component="span"
      >
        {t(label)}
      </Typography>
    </div>
  )
}
