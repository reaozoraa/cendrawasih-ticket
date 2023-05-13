import React, { useEffect, useState } from "react";
import { userAccessToken , fetchUser } from "../utils/fetchUserDetails";
import { useRouter } from "next/router";

const tiket = () => {
    const router = useRouter();
    const [user, setUser] = useState ({})

    useEffect(() =>  {
        const accessToken = userAccessToken();
        if(!accessToken) router.push("/login")

        const userInfo = fetchUser();
        setUser(userInfo);

    }, []);

    const signOutGoogle = () => {
        localStorage.clear()
        router.push("/login")
    }
    return (
        <>
        <h1>Cendrawasih Tiket</h1>
        <div onClick={signOutGoogle}>Logout</div>
        </>
        
        
        
        // <div>{user? "Selamat datang "+ user.displayName : ""}</div>
        
    )
}

export default tiket


// export async function getStaticProps(context) {
//     let flightApi = await fetch ({NEXT_PUBLIC_FIREBASE_DATABASE_URL})
//     flightApi = await flightApi.json()
  
//     console.log(flightApi)
//     return {
//       props: {flightApi: flightApi}, // will be passed to the page component as props
//     }
//   }