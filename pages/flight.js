import Image from 'next/image'
import { Inter } from 'next/font/google'
import PocketBase from 'pocketbase';
import { use, useEffect , useState } from 'react';
import { auth } from "./firebase";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth"

const inter = Inter({ subsets: ['latin'] })

export default function Home({ flightApi }) {
  // const [data,setData] = useState();

  // const url = 'https://airline-travel.p.rapidapi.com/';

  // useEffect(() => {
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'X-RapidAPI-Key': '03b0f3b656msh10d84a25fc7ae22p198dc9jsn1075b3d44129',
  //       'X-RapidAPI-Host': 'airline-travel.p.rapidapi.com'
  //     }
  //   };
    

  //   fetch(url, options)
  //   .then(response => response.json())
  //   .then(response => {
  //     console.log(response);
  //   })
  //   .catch(err =>{
  //     console.error(err);
  //   })
  // }, [])

  useEffect(() => {
    fetch("https://travelimpactmodel.googleapis.com/v1/flights:computeFlightEmissions?key=AIzaSyBzRoI6f4C0FvIh7fjOohxo7jioZLMnm-U" , {method: "POST"})
    .then(res => res.json())
    .then(data => console.log(data))
  } , [])

  // console.log(flightApi)

  return <div>ok</div>
}
// export async function getServerSideProps(context) {
//   let flightApi = await fetch (`https://travelimpactmodel.googleapis.com/v1/flights:computeFlightEmissions?key=$AIzaSyBzRoI6f4C0FvIh7fjOohxo7jioZLMnm-U`)
//   flightApi = await flightApi.json()

//   return {
//     props: {flightApi}, // will be passed to the page component as props
//   }
// }