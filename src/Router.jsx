import React from  'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar'
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login'
import Feed from './components/Feed'

import { AuthProvider } from "./authentication/Auth";
import PrivateRoute from "./authentication/PrivateRoute";

export default function Router(){
return(
    <>
      <AuthProvider>
    <BrowserRouter>
         <Navbar/>

      <Routes>

          <Route path="/" element={<Home />} />
          <PrivateRoute path="/feed" element={<Feed/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login
       
          />
          } />
          

      </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
)

}