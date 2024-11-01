import { onAuthStateChanged, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { StyledFirebaseAuth } from '.'
import { auth } from './firebase'

const AuthContext = createContext(null)

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    },
    GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
  },
  signInSuccessUrl: process.env.REACT_APP_SIGNIN_SUCCESS_URL
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export const SignIn = () => {
  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
  )
}
