import { initializeApp } from 'firebase/app'
import { getAuth, signOut } from 'firebase/auth'

const firebaseApiKey = process.env.REACT_APP_FIREBASE_KEY

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: 'react-discovery-f4c9e.firebaseapp.com',
  projectId: 'react-discovery-f4c9e',
  storageBucket: 'react-discovery-f4c9e.firebasestorage.app',
  messagingSenderId: '444223358031',
  appId: '1:444223358031:web:1de59f1b8ced8ca5c6d63a',
  measurementId: 'G-H0G889WHYP'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const SignOut = () => {
  return signOut(auth)
}
