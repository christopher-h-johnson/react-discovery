import { Tune } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import withStyles from '@mui/styles/withStyles'
import {
  GroupSelectedFilters,
  IOverridableStyledComponent,
  ItemListFlat,
  SortingListFlat
} from '@react-discovery/components'
import {
  getCollectionByKey,
  getCurrentCollection,
  getRefinementListFilters,
  OSCore,
  useAppDispatch,
  usePrevious
} from '@react-discovery/internal'
import React, { ReactElement, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

const AccordionComponent = withStyles({
  expanded: {},
  root: {
    '&$expanded': {
      margin: 'auto'
    },
    '&:before': {
      display: 'none'
    },
    '&:not(:last-child)': {
      borderBottom: 0
    },
    backgroundColor: '#fafafa',
    border: 'none',
    boxShadow: 'none'
  }
})(Accordion)

const AccordionSummaryComponent = withStyles({
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {},
  root: {
    '&$expanded': {
      minHeight: 56
    },
    backgroundColor: '#fafafa',
    borderBottom: 'none',
    marginBottom: -1,
    minHeight: 56
  }
})(AccordionSummary)

const AccordionDetailsComponent = withStyles((theme): any => ({
  root: {
    display: 'flex',
    padding: theme.spacing(2)
  }
}))(AccordionDetails)

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme): any => ({
  button: {
    margin: theme.spacing(1)
  },
  content: {
    display: 'flex',
    flex: '1 0 auto',
    paddingRight: 36
  },
  grow: {
    flexGrow: 1
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15)
  },
  inline: {
    display: 'inline',
    paddingLeft: 16,
    textAlign: 'right'
  },
  leftIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15)
  }
}))

export const ListFilters: React.FC<IOverridableStyledComponent> = (): ReactElement => {
  const classes: any = useStyles({})
  const currentCollection = getCurrentCollection()
  const collectionObj = getCollectionByKey(currentCollection)
  const refinementListFilters = getRefinementListFilters()
  const prevRefinementListFilters = usePrevious(refinementListFilters)
  const { t } = useTranslation(['common', 'vocab'])
  const dispatch = useAppDispatch()
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (): void => {
    setExpanded(!expanded)
  }

  useEffect((): void => {
    if (prevRefinementListFilters !== refinementListFilters) {
      const { refinementListFilters } = collectionObj
      const aggs = OSCore.builders.buildAggs(refinementListFilters)
      dispatch(OSCore.state.setAggs({ aggs }))
    }
  }, [collectionObj, dispatch, prevRefinementListFilters, refinementListFilters])

  const buildRefinementListFilters = (): ReactElement[] => {
    return Object.keys(refinementListFilters).map((id: any): ReactElement => (
      <ItemListFlat
        classes={classes}
        field={refinementListFilters[id].field}
        id={id}
        key={uuidv4()}
        label={t(`vocab:${refinementListFilters[id].label}`)}
        size={refinementListFilters[id].size}
      />))
  }

  return (
    <AccordionComponent
      expanded={expanded}
      onChange={handleChange}
      square
    >
      <AccordionSummaryComponent
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        <Button
          className={classes.button}
          color="primary"
          href=''
          variant="outlined"
        >
          Filter
          <Tune className={classes.leftIcon} />
        </Button>
        <GroupSelectedFilters/>
      </AccordionSummaryComponent>
      <AccordionDetailsComponent>
        {buildRefinementListFilters()}
        <SortingListFlat/>
      </AccordionDetailsComponent>
    </AccordionComponent>)
}
