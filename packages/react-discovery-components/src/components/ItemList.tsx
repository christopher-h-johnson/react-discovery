import { ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { OSCore, useAppDispatch } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { useItemListStyles } from '../styles'

export interface IItemListProps {
  classes?: any;
  field: string;
  key: number;
  label: string;
}

export const ItemList: React.FC<IItemListProps> = (props): ReactElement => {
  const classes: any = props.classes || useItemListStyles({})
  const dispatch = useAppDispatch()
  const { field, label } = props
  const aggregation = OSCore.state.getAggregation(field)
  const filters = OSCore.state.getFiltersForField(field)
  const stringInput = OSCore.state.getStringInput()
  const [isExpanded, setExpanded] = React.useState(false)

  const CustomizedAccordionDetails = styled(AccordionDetails)`
    
    display: flex;
    padding: 16
  `

  const handleExpand = (panel): any => ({}, isExpanded): void => { // eslint-disable-line no-empty-pattern
    setExpanded(isExpanded ? panel : false)
  }

  const handleChange = (key): void => {
    const newFilters = filters && filters.length ? filters.filter((f): any => f !== key) : []
    newFilters.push(key)
    dispatch(OSCore.state.setSelectedFilters({ field, filters: newFilters }))
    dispatch(OSCore.state.setQueryInput({ stringInput }))
    dispatch(OSCore.state.setFrom({ from: 0 }))
  }

  const actions = (aggregation): ReactElement => {
    return aggregation.buckets.map((bucket, i): any => {
      return (
        <ListItemButton
          component='div'
          data-testid={`item-${i}`}
          dense
          disableGutters={true}
          key={bucket.key}
          onClick={(): void => handleChange(bucket.key)}
          role={undefined}
        >
          <ListItemText
            className={classes.content}
            primary={
              <Typography
                className={classes.grow}
                component="div"
                variant='body2'
              >
                {bucket.key}
              </Typography>
            }
            secondary={
              <Typography
                className={classes.inline}
                color="textPrimary"
                component="div"
                variant="body2"
              >
                {bucket.doc_count}
              </Typography>
            }/>
        </ListItemButton>
      )
    })
  }

  const PANEL_ID = 'panel1'

  return (
    <Accordion
      expanded={Boolean(isExpanded)}
      onChange={handleExpand(PANEL_ID)}
    >
      <AccordionSummary
        aria-controls="panel1bh-content"
        classes={{
          expanded: classes.expanded,
          root: classes.expansionSummaryRoot
        }}
        data-testid={'item-list-expansion-panel'}
        expandIcon={<ExpandMore />}
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>{label}</Typography>
      </AccordionSummary>
      <CustomizedAccordionDetails>
        <Grid container spacing={2}>
          <Grid item>
            <List
              component="nav"
              style={{ width: '100%' }}
            >
              {aggregation && actions(aggregation)}
            </List>
          </Grid>
        </Grid>
      </CustomizedAccordionDetails>
    </Accordion>
  )
}
