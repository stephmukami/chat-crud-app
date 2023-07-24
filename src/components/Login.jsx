import React, { useCallback, useContext, useState } from "react";
import { useNavigate,Link } from 'react-router-dom';

import {app,auth} from '../authentication/firebase'; //maybe shd be auth
import { signInWithEmailAndPassword } from "firebase/auth";
export default function Login ({handleView}) {

  const navigate = useNavigate(); // Hook for navigation

  //state
  const [login,setLogin] = useState(
    { 
   email: '',
     password: ''
   }
   )
   const [error,setError] = useState(false)

   //handling state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value
    }));
  };

  

  function signIn(e){
    e.preventDefault();
    signInWithEmailAndPassword(auth, login.email, login.password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/feed')
        handleView(true)
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setError(true)
      });
  }

  const noError = (
    <form onSubmit={signIn} >
      <div className="input-wrapper">
          <input
            type="email"
            name= 'email'
            placeholder="Enter your email"
            value={login.email}
            onChange={(e)=> handleChange(e)} //try without passing e
          ></input>
      </div>

        <div className="input-wrapper">
            <input
              type="password"
              name= 'password'
              placeholder="Enter your password"
              value={login.password}
              onChange={(e)=> handleChange(e)}
            ></input>
          </div>

 
        <button type='submit'>Submit</button>
    </form>
  )
  const errorContent = (
    <div>
  <h3>You dont have an account 😥</h3>
    <Link to ='/signup'>create one now</Link>
    </div>
  
  )
  
  return(
    <>
    <div className="log-container">
          <h1 className="message">Or Log Back In</h1>
          <div className="log-form">
          {
            error ? errorContent : noError
          }
          </div>
    </div>
    
    </>
  )
};

// some users -> robym4378@bestspeakingcourses.com pass: qwertyu