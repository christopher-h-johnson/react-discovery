import React, { ReactElement, useEffect, useRef, useState } from 'react'
import OpenSeadragon from 'openseadragon'
import { makeStyles } from '@material-ui/core'
import { usePrevious } from '@react-discovery/core'

export interface ISingleImageOsdComponentProps {
  classes?: any;
  image: string;
}

const useStyles = makeStyles((): any => ({
  osdRoot: {
    background: 'black',
    height: '75%',
    position: 'absolute',
    width: '100%'
  }
}))

export const SingleImageOSDViewer: React.FC<ISingleImageOsdComponentProps> = (props): ReactElement => {
  const classes: any = props.classes || useStyles({})
  const [isInitialized, setIsInitialized] = useState(false)
  const [osd, setOsd] = useState(null)
  const osdRef = useRef(null)
  const { image } = props
  const prevImage = usePrevious(image)

  const defaultOsdProps = (): {} => {
    const showNavigator = false
    const showReferenceStrip = false
    const ajaxHeaders = {
      // "x-requested-with": "XMLHttpRequest",
    }

    return {
      ajaxHeaders,
      constrainDuringPan: false,
      crossOriginPolicy: 'Anonymous',
      defaultZoomLevel: 0,
      element: osdRef.current,
      loadTilesWithAjax: true,
      maxZoomLevel: 10,
      minZoomLevel: 0,
      navigatorPosition: 'BOTTOM_RIGHT',
      referenceStripScroll: 'vertical',
      sequenceMode: false,
      showFullPageControl: false,
      showHomeControl: false,
      showNavigator,
      showReferenceStrip,
      showRotationControl: false,
      showSequenceControl: false,
      showZoomControl: false,
      visibilityRatio: 0.5
    }
  }

  const updateViewer = (config): void => {
    if (!osd) {
      const osd = new OpenSeadragon(config)
      osd.open([{
        tileSource: image
      }])
      osd.viewport.goHome(true)
      setOsd(osd)
    } else {
      osd.open([{
        tileSource: image
      }])
      osd.viewport.goHome(true)
    }
  }

  useEffect(
    (): void => {
      if (!isInitialized && image) {
        updateViewer(defaultOsdProps())
        setIsInitialized(true)
      } else if (prevImage !== image) {
        updateViewer(defaultOsdProps())
      }
    })

  return (
    <div
      className={classes.osdRoot}
      ref={osdRef}
    />
  )
}
