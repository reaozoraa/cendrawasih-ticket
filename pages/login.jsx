import React, { Profiler } from "react";
import {getAuth , signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { FirebaseApp } from "../firebase-config";
import { useRouter } from "next/router";

const loginGoogle = () => {
    const firebaseAuthGoogle = getAuth(FirebaseApp);
    const providerGoogle = new GoogleAuthProvider();
    const router = useRouter();

    const signInGoogle = async() => {
       const {user} = await signInWithPopup(firebaseAuthGoogle,providerGoogle)
       const {refreshToken, providerData} = user ;
       
       localStorage.setItem('user', JSON.stringify(providerData));
       localStorage.setItem('accessToken', JSON.stringify(refreshToken));

       router.push("/dashboard")
    };
    return(
        <div onClick={signInGoogle}>Login</div>
    )
};

export default loginGoogle