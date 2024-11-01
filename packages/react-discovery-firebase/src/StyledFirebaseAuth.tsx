import React, { useEffect, useRef, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

interface Props {
  uiConfig: firebaseui.auth.Config;
  uiCallback?(ui: firebaseui.auth.AuthUI): void;
  firebaseAuth: any;
  className?: string;
}

export const StyledFirebaseAuth = ({ uiConfig, firebaseAuth, className, uiCallback }: Props) => {
  const [userSignedIn, setUserSignedIn] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth)
    if (uiConfig.signInFlow === 'popup') { firebaseUiWidget.reset() }

    const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user && userSignedIn) { firebaseUiWidget.reset() }
      setUserSignedIn(!!user)
    })

    if (uiCallback) { uiCallback(firebaseUiWidget) }

    // @ts-ignore
    firebaseUiWidget.start(elementRef.current, uiConfig)

    return () => {
      unregisterAuthObserver()
      firebaseUiWidget.reset()
    }
  }, [firebaseui, uiConfig])

  return <div className={className} ref={elementRef} />
}
