import makeStyles from '@mui/styles/makeStyles'
import { OSCore, removeViewId, setWorkspaceLayout, useAppDispatch, usePrevious } from '@react-discovery/internal'
import React, { lazy, ReactElement, Suspense, useEffect } from 'react'
import {
  createBalancedTreeFromLeaves,
  getLeaves,
  Mosaic,
  MosaicNode,
  MosaicParent,
  MosaicWindow
} from 'react-mosaic-component'
import { ZeroState } from '.'
import { getWorkspaceLayout, getWorkspaceViewIdMap } from './state'
import { useMosaicStyles } from './styles'
import { createRandomNode } from './utils'

export interface IWorkspaceMosaic {
  currentNode?: MosaicNode<number> | null;
  windowAppBar?: any;
}

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    margin: 0,
    overflow: 'hidden',
    width: '100%'
  },
  toolbarRoot: {
    flexGrow: 1,
    width: '100%'
  }
}))

const VIEW_COMPONENT_PATH = './views'
const Component = lazy((): Promise<any> => import(`${VIEW_COMPONENT_PATH}/View`))

export const MosaicWorkspace: React.FC<IWorkspaceMosaic> = (props): ReactElement => {
  const { windowAppBar } = props
  const dispatch = useAppDispatch()
  useMosaicStyles({})
  const classes = useStyles({})
  const hits = OSCore.state.getHits()
  const nodes = hits.hits.map((hit) => hit.id)
  const createNode = (): string => nodes && createRandomNode(nodes)
  const workspaceLayout: MosaicParent<string> = getWorkspaceLayout()

  const viewIdMap = getWorkspaceViewIdMap()
  const prevViewIdMap = usePrevious(viewIdMap)
  const prevLayout = usePrevious(workspaceLayout)

  const buildWorkspaceLayout: any = (): MosaicNode<string> => {
    const windowInstances = Object.keys(viewIdMap).sort()
    const leaveKeys = getLeaves(workspaceLayout)
    if (windowInstances && (!windowInstances.every(e => leaveKeys.includes(e)) ||
      !leaveKeys.every(e => windowInstances.includes(e)))) {
      return createBalancedTreeFromLeaves(windowInstances)
    }
    return workspaceLayout
  }

  const onChange = (currentNode: MosaicParent<string> | null): void => {
    dispatch(setWorkspaceLayout({ layout: currentNode }))
  }

  const renderTile = (id, path): ReactElement => {
    const dataId = Object.keys(viewIdMap).length && viewIdMap[id] && viewIdMap[id].id
    const manifest = Object.keys(viewIdMap).length && viewIdMap[id] && viewIdMap[id].manifest
    const type = Object.keys(viewIdMap).length && viewIdMap[id] && viewIdMap[id].type
    const WindowAppBar = windowAppBar
    return (
      <MosaicWindow<string>
        createNode={createNode}
        path={path}
        renderToolbar={(): ReactElement =>
          <div className={classes.toolbarRoot}>
            <WindowAppBar dataId={dataId} id={id} removeViewId={removeViewId}/>
          </div>}
        title={`Window ${id}`}
      >
        <Suspense fallback={'loading'}>
          <Component
            id={dataId}
            key={id}
            manifest={manifest}
            viewType={type}
          />
        </Suspense>
      </MosaicWindow>
    )
  }

  useEffect((): void => {
    dispatch(setWorkspaceLayout({ layout: buildWorkspaceLayout() }))
    if (Object.is(workspaceLayout, prevLayout)) {
      dispatch(setWorkspaceLayout({ layout: workspaceLayout }))
    }

    if (viewIdMap !== prevViewIdMap) {
      dispatch(setWorkspaceLayout({ layout: buildWorkspaceLayout() }))
    }
  }, [workspaceLayout, prevLayout, prevViewIdMap, viewIdMap])

  const zeroStateView = <div style={{ margin: 'auto', position: 'absolute' }}><ZeroState createNode={createNode}/></div>

  return (
    <div className={classes.root}>
      <Mosaic<string>
        onChange={onChange}
        renderTile={(id, path): ReactElement => renderTile(id, path)}
        value={workspaceLayout}
        zeroStateView={zeroStateView}
      />
    </div>
  )
}
