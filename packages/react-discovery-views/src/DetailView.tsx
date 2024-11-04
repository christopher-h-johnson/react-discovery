import { Close, Info } from '@mui/icons-material'
import { Box, Card, CardContent, CssBaseline, Divider, Drawer, IconButton, Theme, Typography } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Grid from '@mui/material/Grid2'
import { styled } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import {
  buildHighlightedValueForHit,
  FieldValueDisplay,
  getFirstManifestFromHit,
  TitleIdHeader,
  ValueDisplay
} from '@react-discovery/components'
import { SimpleImageViewer } from '@react-discovery/iiif'
import { getCurrentCollection, OSCore } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import {
  AddToWorkspaceButton,
  ArrowBackButton,
  ArrowForwardButton,
  Domain,
  domainEntitySpec,
  EntityDisplay,
  HitViewOptionsMenu
} from '.'

interface IDetailView {
  actions: any;
  classes?: any;
}

const useStyles = makeStyles((theme: Theme): any =>
  createStyles({
    cardContent: {
      display: 'inline',
      flex: '1 0 auto',
      padding: 0,
      marginBottom: 5
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      padding: 20
    },
    imageGrid: {
      height: '80vh',
      minHeight: '80vh',
      width: '100%',
      flexBasis: 0
    },
    osdRoot: {
      background: 'black',
      height: '100%'
    },
    root: {
      backgroundColor: theme.palette.background.paper,
      display: 'flex-root',
      marginBottom: 5,
      padding: 12,
      top: 60
    },
    title: {
      color: 'green'
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      },
      justifyContent: 'right',
      paddingRight: 48
    }
  })
)

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginRight: -drawerWidth,
  position: 'relative',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: 0
      }
    }
  ]
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'flex-start',
  minHeight: 48,
  top: 60
}))

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line
  interface DefaultTheme extends Theme {}
}

const drawerWidth = 480

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme }) => ({
  top: 60,
  background: 'transparent',
  boxShadow: 'none',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        top: 60,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: drawerWidth
      }
    }
  ]
}))

export const DetailView: React.FC<IDetailView> = (props): ReactElement => {
  const { getNumberOfWorkspaceNodesForId, getWorkspaceViewIdMap, setViewIdMap } = props.actions
  const addToWorkspaceButtonActions = {
    getWorkspaceViewIdMap, setViewIdMap
  }
  const optionsMenuActions = {
    getNumberOfWorkspaceNodesForId, setViewIdMap
  }

  const [open, setOpen] = React.useState(false)
  const handleDrawerOpen = (): void => {
    setOpen(!open)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const classes: any = useStyles({}) || props.classes
  /*  const currentCollection = getCurrentCollection()
  const defaultCollection = process.env.REACT_APP_SEARCH_API_COLLECTION */
  const { collection, id } = useParams()
  const numFound = OSCore.state.getNumFound()
  const isSingleton = numFound === 1
  const hitIndex = OSCore.state.getHitIndexForId(id)
  const currentHit = OSCore.state.getHitForIndex(hitIndex)
  const docIndex = currentHit && currentHit.index
  const searchFields = OSCore.state.getSearchFields()
  const title = currentHit && (buildHighlightedValueForHit(Domain.DOC_TITLE_FIELD, currentHit) ||
    buildHighlightedValueForHit('Title', currentHit))
  const manifest = currentHit && getFirstManifestFromHit(currentHit, Domain.MEDIA)
  const item = {
    [Domain.MEDIA_TITLE_FIELD]: title,
    [Domain.MANIFEST_ID_FIELD]: manifest
  }

  /*  const buildCardActions = (cardActions): ReactElement[] => {
    return cardActions.map((item, i): ReactElement =>
      <CardActions
        disableSpacing
        key={i}
      >
        <EntityDisplay
          displayFields={item.displayFields}
          hit={currentHit}
          isNested={item.isNested}
          nestedDisplayFields={item.nestedDisplayFields}
          type={item.type}
        />
      </CardActions>
    )
  } */

  const buildImageViewer = (): ReactElement => {
    return (
      <Grid className={classes.imageGrid} size={6}>
        {manifest ? (<SimpleImageViewer classes={classes} manifest={manifest}/>) : null}
      </Grid>
    )
  }

  const optionsMenu = id && <HitViewOptionsMenu actions={optionsMenuActions} id={id} index={docIndex}/>
  const addButton = currentHit && <AddToWorkspaceButton actions={addToWorkspaceButtonActions} classes={classes} hit={currentHit} item={item}/>

  const buildDetailView = (): ReactElement => {
    return (
       <Grid container>
         <Grid size='grow'>
          <Card className={classes.root}>
            <TitleIdHeader
              addButton={addButton}
              id={id}
              optionsMenu={optionsMenu}
              title={title}
            />
             <div className={classes.details}>
                <ValueDisplay
                  field={Domain.DOC_SUBTITLE_FIELD}
                  hit={currentHit}
                  style={{ display: 'flex', padding: '10px' }}
                  variant='h6'
                />
                {searchFields.map((field, key): ReactElement =>
                  <CardContent
                    className={classes.cardContent}
                    key={key}
                  >{currentHit._source && currentHit._source[field.field]
                    ? <FieldValueDisplay field={field} hit={currentHit}/>
                    : null}
                  </CardContent>)}
               {/* currentCollection === defaultCollection ? buildCardActions(domainEntitySpec) : null */}
              </div>
          </Card>
         </Grid>
         <Grid size={1}/>
        </Grid>
    )
  }

  return currentHit
    ? (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              size="large"
              sx={{
                marginRight: 20
              }}
            >
              <Info/>
            </IconButton>
          </div>
        </AppBar>
        <Main open={open}>
          <Grid
            container
            key={uuidv4()}
            spacing={3}
          >
            <Grid size='grow'>
             {!isSingleton ? <ArrowBackButton collection={collection} hitIndex={hitIndex}/> : null}
            </Grid>
            <Grid size={10}>
              {buildImageViewer()}
            </Grid>
            <Grid size='grow'>
            {!isSingleton ? <ArrowForwardButton collection={collection} hitIndex={hitIndex}/> : null}
            </Grid>
          </Grid>
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              top: 60,
              width: drawerWidth
            }
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <Close />
            </IconButton>
            <Typography variant="h6">
              Info
            </Typography>
          </DrawerHeader>
          <Divider />
          {buildDetailView()}
        </Drawer>
      </Box>
      )
    : null
}
