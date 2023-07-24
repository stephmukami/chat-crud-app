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
    <button className='log-out-btn' onClick={userSignOut}>Log Out</button>

  )
  const loggedOutContent = (              
    <Link to="/login">Login</Link>
  )
    return(
        <>
        <div className='navbar'>

          <div className='brand'>
   
            <h1>Chatter</h1>
            

            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>heart-box-outline</title><path d="M12,17L11.28,16.34C8.7,14 7,12.46 7,10.57C7,9.03 8.21,7.82 9.75,7.82C10.62,7.82 11.45,8.23 12,8.87C12.55,8.23 13.38,7.82 14.25,7.82C15.79,7.82 17,9.03 17,10.57C17,12.46 15.3,14 12.72,16.34L12,17M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M5,5V19H19V5H5Z" /></svg>

          
            
            
          
         
          </div>

          <div className='links'>
      
          <div>
              
              <Link to="/">Home</Link>
            
            </div>
          
            <div>
              
              <Link to="/signup">Sign Up</Link>
            </div>
          
          <div>
            
            {viewLogin ? loggedInContent : loggedOutContent}
            
          </div>
         
          </div>
        
         
          
      


            
        </div>
        </>
    )
}