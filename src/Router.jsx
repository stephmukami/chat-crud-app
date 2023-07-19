import React from  'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

import Navbar from './components/Navbar'
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login'
import Feed from './components/Feed'
import Auth from './authentication/Auth';


export default function Router(){
 
    //STATES
 //changing login to be logout or vice versa
    const[viewLogin,setViewLogin] = useState(true)

    function handleView(){
        setViewLogin(false)
    }

    //dispalying login form or  create account message
return(
    <>
    <BrowserRouter>
         <Navbar
         handleView = {handleView}
         viewLogin = {viewLogin}
         />

      <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/>} 
            handleView = {handleView}
            viewLogin = {viewLogin}
          />
          <Route path="/feed" element={<Feed />} />
          <Route path="/auth" element={<Auth />} />


      </Routes>
      </BrowserRouter>
    </>
)

}