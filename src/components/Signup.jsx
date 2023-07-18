import React, { useCallback,useNavigate } from "react";
import {app,auth} from '../authentication/firebase'; //maybe shd be auth
//maybe shd be auth
const SignUp = () => {
    const navigate = useNavigate(); // Use useNavigate hook instead of withRouter

  const handleSignUp = useCallback(async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await auth.auth().createUserWithEmailAndPassword(email.value, password.value);
      navigate("/"); // Use navigate function instead of history.push
    } catch (error) {
      alert(error);
    }
  }, [navigate]);

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;