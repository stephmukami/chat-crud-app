import React from 'react'
import {signOut } from "firebase/auth";
import {app,auth,db} from '../authentication/firebase'; //maybe shd be auth


export default function Feed(){

    function userSignOut(){
        signOut(auth)
        .then(() => {
          console.log("sign out successful");
        })
        .catch((error) => console.log(error));
    
      }
    return(
        <>
        <h1>Feed page</h1>
        <button onClick={userSignOut}>Log Out</button>

        </>
    )
}