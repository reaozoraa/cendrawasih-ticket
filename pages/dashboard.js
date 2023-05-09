import React, { useEffect, useState } from "react";
import { userAccessToken , fetchUser } from "../utils/fetchUserDetails";
import { useRouter } from "next/router";

const dashboard = () => {
    const router = useRouter();
    const [user, setUser] = useState ({})

    useEffect(() =>  {
        const accessToken = userAccessToken();
        if(!accessToken) router.push("/login")

        const [userInfo] = fetchUser();
        setUser(userInfo);

    }, []);

    const signOutGoogle = () => {
        localStorage.clear()
        router.push("/login")
    }
    return (
        
        <div onClick={signOutGoogle}>Logout</div>
    
        
        // <div>{user? "Selamat datang "+ user.displayName : ""}</div>
        
    )
}

export default dashboard