import React, { ReactElement } from 'react'
import { useInnerHtmlValueStyles } from '../styles'

interface IInnerHtmlValue {
  classes?: any;
  value: string;
}

export const InnerHtmlValue: React.FC<IInnerHtmlValue> = (props): ReactElement => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes: any = props.classes || useInnerHtmlValueStyles({})
  const { value } = props
  return (
    <div className={classes.values} dangerouslySetInnerHTML={{ __html: value }}/>
  )
}
