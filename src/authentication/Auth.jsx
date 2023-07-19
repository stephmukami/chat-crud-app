import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {app,auth} from './firebase';
import Feed from "../components/Feed";
import Home from "../components/Home";

export default function Auth(){

  //state
  const [authUser,setAuthUser] = useState(null);

  
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, [])


  return(
    <>
    
    <div>
    {authUser ? (
        <>
          {/* put in feed page
          <p>{`Signed In as ${authUser.email}`}</p>
           */}
           <Feed/>
        </>
      ) : (
        //put sth more elaborate
        <Home/>
      )}
    </div>
    </>
  )
}