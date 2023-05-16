import React, { Profiler } from "react";
import {getAuth , signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { FirebaseApp } from "../firebase-config";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import FormError from "@/components/form/error";
import { signInEmail, GetSignInErrorMessage ,signUpEmail} from "../firebase-config";


const login = () => {
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // // const onSubmit = data => console.log(data);
    // const onSubmit = async (values) => {
    //     const {email,password} = values
    //     try {
    
    //        const data = await signInEmail(email,password)
    //         console.log(data);
    //     } catch (errors){
    //         console.log(errors.code ,errors.message)
    //     }
    // }




    const firebaseAuthGoogle = getAuth(FirebaseApp);
    const providerGoogle = new GoogleAuthProvider();
    const router = useRouter();








    const signInGoogle = async() => {
       const {user} = await signInWithPopup(firebaseAuthGoogle,providerGoogle)
       const {refreshToken, providerData} = user ;
       
       localStorage.setItem('user', JSON.stringify(providerData));
       localStorage.setItem('accessToken', JSON.stringify(refreshToken));

       router.push("/tiket")
    };
    return(
        <>
       
        <div onClick={signInGoogle}>Login with google</div>
        </>
    )
};

export default login
