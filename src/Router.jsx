import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Feed from './components/Feed';
import Auth from './authentication/Auth';
import NotFound404 from './components/NotFound404';

export default function Router() {
  const [viewLogin, setViewLogin] = useState(false);

  function handleView(param) {
    setViewLogin(param);
  }

  return (
    <>
      <BrowserRouter>
        <Navbar handleView={handleView} viewLogin={viewLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login
          handleView={handleView}
          />} />
          <Route
            path="/feed"
            element={<Feed />}
          />
          <Route
            path="/auth"
            element={<Auth handleView={handleView} />} // Pass only the handleView function, not the viewLogin state
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
