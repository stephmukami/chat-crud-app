import React from 'react'
import { useNavigate,Link } from 'react-router-dom';
import {signOut } from "firebase/auth";
import {app,auth,db} from '../authentication/firebase'; //maybe shd be auth

export default function Navbar({handleView,viewLogin}){
  const navigate = useNavigate(); // Hook for navigation

  function userSignOut(){
    signOut(auth)
    .then(() => {
      console.log("sign out successful");
    })
    .catch((error) => console.log(error));
    //put the login  link after logging out 
    navigate('/')
    handleView(false)
  }

 

  const loggedInContent = (
    <button onClick={userSignOut}>Log Out</button>

  )
  const loggedOutContent = (              
    <Link to="/login">Login</Link>
  )
    return(
        <>
        <div className='navbar'>
        <ul>
            <div>
              <li>
              <Link to="/">Home</Link>
            </li>
            </div>
          
            <div>
              <li>
              <Link to="/signup">Sign up</Link>
            </li>
            </div>
          
          <div>
            <li>
            {viewLogin ? loggedInContent : loggedOutContent}
            </li>
          </div>
         
         
          
      </ul>


            
        </div>
        </>
    )
}