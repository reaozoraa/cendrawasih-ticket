import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword , signOut, signInWithEmailAndPassword} from 'firebase/auth'


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL:  process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId:  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:  process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth()

export const Authentication = () => {
  return FirebaseAuth
}

export const signUpEmail = async (email , password) => {
  return await createUserWithEmailAndPassword (firebaseAuth, email,password)
}

export const signInEmail = async (email,password) => {
 return await signInWithEmailAndPassword(firebaseAuth, email,password)
}

export const signOutEmail = async () => {
  await signInWithEmailAndPassword(firebaseAuth)
}

export const getSignInErrorMessage = (code) => {
  switch (code) {
    case 'auth/user-not-found':
      return 'Email tidak terdaftar'
    case 'auth/wrong-password':
    default:
      return 'Email atau password salah'
  }
}