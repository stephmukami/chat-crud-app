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

    <input
        type="email"
        name= 'email'
        placeholder="Enter your email"
        value={login.email}
        onChange={(e)=> handleChange(e)} //try without passing e
      ></input>
    <input
          type="password"
          name= 'password'
          placeholder="Enter your password"
          value={login.password}
          onChange={(e)=> handleChange(e)}
        ></input>
        <button type='submit'>Submit</button>
    </form>
  )
  const errorContent = (
    <div>
  <h3>Create an account</h3>
    <Link to ='/signup'>create an account now</Link>
    </div>
  
  )
  
  return(
    <>
    <h1>Login</h1>
    <div>
    {
      error ? errorContent : noError
    }
    </div>
    </>
  )
};

// some users -> robym4378@bestspeakingcourses.com pass: qwertyu