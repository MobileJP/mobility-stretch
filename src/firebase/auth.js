import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from './config'

const provider = new GoogleAuthProvider()

export const signInWithGoogle  = () => signInWithPopup(auth, provider)
export const signOutUser       = () => signOut(auth)
export const onAuthStateChange = (callback) => onAuthStateChanged(auth, callback)
