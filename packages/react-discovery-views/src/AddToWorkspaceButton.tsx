import { CheckCircle, CheckCircleOutline } from '@mui/icons-material'
import { IHit } from '@react-discovery/core'
import { usePrevious } from '@react-discovery/elasticsearch-app'
import { IconButton, Tooltip } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import withStyles from '@mui/styles/withStyles'
import React, { ReactElement, useEffect, useRef } from 'react'
import { Domain } from './enum'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Theme } from '@mui/material/styles'
import { Instance } from '@popperjs/core'

interface IAddToWorkspaceButton {
  actions: any;
  classes?: any;
  hit: IHit;
  item: any;
}

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme): any => ({
  title: {
    color: theme.palette.common.white
  }
}))

const HoverButton = withStyles(() => ({
  root: {
    '&:hover': {
      opacity: 1
    },
    color: 'white',
    opacity: 0
  }
}))(IconButton)

export const AddToWorkspaceButton: React.FC<IAddToWorkspaceButton> = (props): ReactElement => {
  const { getWorkspaceViewIdMap, setViewIdMap } = props.actions
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes: any = props.classes || useStyles({})
  const { hit, item } = props
  const id = hit && (hit._source.id || hit.id)
  const dispatch = useDispatch()
  const viewIdMap = getWorkspaceViewIdMap()
  const prevViewIdMap = usePrevious(viewIdMap)
  const { t } = useTranslation()
  const [currentManifestNodes, setManifestNodes] = React.useState([])
  const nodeCount = currentManifestNodes.filter((node): boolean => node === item[Domain.MANIFEST_ID_FIELD])

  const popperRef = useRef<Instance>(null)
  const areaRef = useRef<HTMLDivElement>(null)

  useEffect((): void => {
    if (prevViewIdMap !== viewIdMap) {
      const manifestsInMap = Object.values(viewIdMap).map((instance: any) => instance.manifest)
      setManifestNodes([...manifestsInMap])
    }
  }, [prevViewIdMap, viewIdMap])

  const handleAddToWorkspace = (manifest): void => {
    if (popperRef.current != null) {
      popperRef.current.update()
    }
    dispatch(setViewIdMap({ id, manifest, type: 'image' }))
  }

  return (
    (<div ref={areaRef}>
        <Tooltip
          title={t('addMediaToWorkspace')}
          PopperProps={{
            popperRef,
            anchorEl: {
              getBoundingClientRect: () => {
                return new DOMRect(
                    areaRef.current!.getBoundingClientRect().x + 120,
                    areaRef.current!.getBoundingClientRect().y + 40,
                    0,
                    0
                )
              }
            }
          }}
        >
          {nodeCount && nodeCount.length
            ? <IconButton
            aria-label={`star ${item[Domain.MEDIA_TITLE_FIELD]}`}
            color='primary'
            onClick={(): void => handleAddToWorkspace(item[Domain.MANIFEST_ID_FIELD])}
            size="large">
              <CheckCircle className={classes.title}/>
            </IconButton>
            : <HoverButton
              aria-label={`star ${item[Domain.MEDIA_TITLE_FIELD]}`}
              onClick={(): void => handleAddToWorkspace(item[Domain.MANIFEST_ID_FIELD])}
            >
              <CheckCircleOutline className={classes.title}/>
            </HoverButton>
          }
        </Tooltip>
      </div>)

  )
}
