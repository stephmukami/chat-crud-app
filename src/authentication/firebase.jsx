// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import dot-env
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import {getFirestore,doc,setDoc} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: PROCESS.ENV.VITE_APP_APIKEY,
authDomain: PROCESS.ENV.VITE_APP_AUTHDOMAIN,
projectId: PROCESS.ENV.VITE_APP_APIKEY,
storageBucket: PROCESS.ENV.STORAGEBUCKET,
messagingSenderId:PROCESS.ENV.VITE_APP_MESSAGING_SENDER_ID,
appId: PROCESS.ENV.VITE_APP_APP_ID,
measurementId: PROCESS.ENV.VITE_APP_MEASUREMENT_ID:
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
