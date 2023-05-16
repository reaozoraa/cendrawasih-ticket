import Image from 'next/image'
import { Inter } from 'next/font/google'
import PocketBase from 'pocketbase';
import { use, useEffect } from 'react';
import { auth } from "./firebase";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth"
import useLogout from './hooks/useLogout';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const logout = useLogout();



  return <>
  
  <button onClick={logout}>LogOut</button>

  </>

  // const pb = new PocketBase('http://127.0.0.1:8090');

  // async function  getDataUsers() {
  //   try {
  //     const result = await pb.collection('users_travel').getList(1);
  //     return result.items[0].username;
  //     // console.log('Result:', result);
  //   } catch (error) {
  //     // console.log('Error:', error);
  //   }
  // }
  // useEffect(() => {
  //   console.log(getDataUsers());
  // })










  // const googleAuth = new GoogleAuthProvider();
  // const [user,setuser]=useAuthState(auth);
  // const login = async()=>{
  //   const result = await signInWithPopup(auth,googleAuth);
  // }

  // useEffect(()=>{
  //   console.log(user);
  // },[user])

  // return (
  //   <div className='google'>
  //   <h1>Cendrawasih Login With google</h1>
  //   <h3>{user? "Selamat datang "+ user.displayName : ""}</h3>
  //   <button onClick={login}>Login</button>
  //   <button onClick={()=>auth.signOut()}>SighOut</button>
  //   </div>
    
  // )
}














// export async function getStaticProps(context) {
//   let flightApi = await fetch (`https://travelimpactmodel.googleapis.com/$discovery/rest?version=v1`)
//   flightApi = await flightApi.json()

//   console.log(flightApi)
//   return {
//     props: {flightApi: flightApi}, // will be passed to the page component as props
//   }
// }