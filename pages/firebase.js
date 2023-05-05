import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCqf4a3yyPmcQQ8vYS_-LNTNDEJ4-iitck",
    authDomain: "cendrawasih-travel.firebaseapp.com",
    projectId: "cendrawasih-travel",
    storageBucket: "cendrawasih-travel.appspot.com",
    messagingSenderId: "1013709728705",
    appId: "1:1013709728705:web:8e77bc76230d18751d1d40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
  