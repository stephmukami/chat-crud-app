// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import {getFirestore,doc,setDoc} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtcC4G6kkfWDPrhBEud__jompbNbskIh8",
authDomain: "[twitter-demo-6dd79.firebaseapp.com](http://twitter-demo-6dd79.firebaseapp.com/)",
projectId: "twitter-demo-6dd79",
storageBucket: "[twitter-demo-6dd79.appspot.com](http://twitter-demo-6dd79.appspot.com/)",
messagingSenderId: "882306578442",
appId: "1:882306578442:web:30b8de93bd5e2134ef07f3",
measurementId: "G-P43EVBVBRY"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)