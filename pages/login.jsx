import React, { Profiler } from "react";
import {getAuth , signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { FirebaseApp } from "../firebase-config";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import FormError from "@/components/form/error";
import { signInEmail, GetSignInErrorMessage ,signUpEmail} from "../firebase-config";


const login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    const onSubmit = async (values) => {
        const {email,password} = values
        try {
    
           const data = await signInEmail(email,password)
            console.log(data);
        } catch (errors){
            console.log(errors.code ,errors.message)
        }
    }




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
        <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <div>
                Email : 
                    <input 
                    id="email"
                    type="email"
                    name="email"    
                    {...register("email",{required:true})}>
                </input>
                <FormError error={errors.email}/>
            </div>
            <div>
                Password :
                <input 
                    id="password"
                    type="password"
                    name="password"    
                    {...register("password",{required:true, minLength:8})}>
            </input>
            <FormError error={errors.password}/>
            {errors.exampleRequired && <span>This field is required</span>}
            </div>
         </form>
         <button type="submit" form="loginForm" value="Submit">Submit</button>




        <div onClick={signInGoogle}>Login with google</div>
        </>
    )
};

export default login
