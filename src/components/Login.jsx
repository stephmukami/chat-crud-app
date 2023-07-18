import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import {app,auth} from '../authentication/firebase'; //maybe shd be auth
import { AuthContext } from "../authentication/Auth.jsx";

export default function Login () {
  const navigate = useNavigate(); // Use useNavigate hook instead of withRouter

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await auth.auth().signInWithEmailAndPassword(email.value, password.value);
        navigate("/"); // Use navigate function instead of history.push
      } catch (error) {
        alert(error);
      }
    },
    [navigate]
  );
 
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    navigate("/"); // Use navigate function instead of Redirect
    return null; // Return null when redirecting to prevent rendering of the login form
  }
  

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

