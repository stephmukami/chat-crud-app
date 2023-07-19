import React, {useState } from "react";
import { useNavigate,Link } from 'react-router-dom';
import {app,auth,db} from '../authentication/firebase'; //maybe shd be auth

import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, updateDoc, arrayUnion ,setDoc} from 'firebase/firestore';

 export default  function Signup(){

  //state
  const [userDetails,setUserDetails] = useState(
   { 
    firstname : '',
    lastname : '',
    email: '',
    password: ''
  }
  )
  const [successful,setSuccessful] = useState(false)
  const navigate = useNavigate();

  //handling state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value
    }));
  };
  //signing up user
  function signUser(e){
    e.preventDefault()
    createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password)
    .then((userCredential) => {
      console.log(userCredential);
          // User signed up successfully
    const user = userCredential.user;
    const userId = user.uid;

     // Add user data to Firestore
     addUserToFirestore(userId, userDetails.firstname, userDetails.lastname);
     //navigating to feed page
     setSuccessful(true)
    })
    .catch((error) => {
      console.error("Error signing up:", error);
    });
  }
  //adding user to firestore collection
  async function addUserToFirestore(userId, firstName, lastName) {
    const usersCollectionRef = doc(db, "users", userId);
  
    // Create a new user document with first name and last name fields
    await setDoc(usersCollectionRef, {
      firstName: firstName,
      lastName: lastName,
      // Add any other additional user data if needed
    });
  }

//adding tweets to firestore(might work better when sb is adding tweets which will be in feed page)
// Function to add a tweet to the user's document in Firestore
// async function addTweetToFirestore(userId, tweetText) {
//   const db = getFirestore();
//   const usersCollectionRef = doc(db, "users", userId);
  
//   // Update the tweets array in the user's document using arrayUnion
//   await updateDoc(usersCollectionRef, {
//     tweets: arrayUnion(tweetText)
//   });
// }

  //displaying different messages
  const beforeSignUp = ( //maybe add a div
<form onSubmit={signUser}>
      <h1>Create account</h1>
        <input
            type="text"
            name= 'firstname'
            placeholder="Enter your firstname"
            value={userDetails.firstname}
            onChange={(e)=> handleChange(e)}
          ></input>

        <input
            type="text"
            name= 'lastname'
            placeholder="Enter your lastname"
            value={userDetails.lastname}
            onChange={(e)=> handleChange(e)}
          ></input>

           <input
          type="email"
          name= 'email'
          placeholder="Enter your email"
          value={userDetails.email}
          onChange={(e)=> handleChange(e)} //try without passing e
        ></input>

        <input
            type="password"
            name= 'password'
            placeholder="Enter your password"
            value={userDetails.password}
            onChange={(e)=> handleChange(e)}
          ></input>
          <button type='submit'>Sign Up</button>
    </form>
  )
  const afterSignUp = (
    <div>
      <h1>All ready to use Courier !</h1>
      <h2>
      <Link to ='/auth'>Start ASAP</Link>
      </h2>
    </div>
    
    )

return(
  <>
  <div className="sign-up-page">
    {successful ? afterSignUp: beforeSignUp}

  </div>
  </>
)
}