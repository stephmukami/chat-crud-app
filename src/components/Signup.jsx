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
    password: '',
    bio:''
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
     addUserToFirestore(userId, userDetails.firstname, userDetails.lastname,userDetails.email,userDetails.password,userDetails.bio);
     //navigating to feed page
     setSuccessful(true)
    })
    .catch((error) => {
      console.error("Error signing up:", error);
      alert(error)
    });
  }

  //adding user to firestore collection
  async function addUserToFirestore(userId, firstName, lastName,email,password,bio) {
    const usersCollectionRef = doc(db, "users", userId);
  
    // Create a new user document with first name and last name fields
    await setDoc(usersCollectionRef, {
      firstName: firstName,
      lastName: lastName,
      email:email,
      password:password,
      bio: bio,
      crumbs:[],
      following:[]
      // Add any other additional user data if needed
    });
  }

//adding tweets to firestore(might work better when sb is adding tweets which will be in feed page)
//Function to add a tweet to the user's document in Firestore
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
  <div className="form-div">
<form className="sign-up-form" onSubmit={signUser}>
        
            <h1>Create account</h1>
       
        <div className="wrapper">
                  <label htmlFor="">First Name</label>
                  <input
                type="text"
                name= 'firstname'
                value={userDetails.firstname}
                onChange={(e)=> handleChange(e)}
              ></input>
        </div>
    
        <div  className="wrapper">
                <label htmlFor="">Last Name</label>
                <input
                type="text"
                name= 'lastname'
                value={userDetails.lastname}
                onChange={(e)=> handleChange(e)}
              ></input>
          </div>
   
          <div  className="wrapper">
                <label htmlFor="">Email</label>
                <input
                type="email"
                name= 'email'
                value={userDetails.email}
                onChange={(e)=> handleChange(e)} //try without passing e
              ></input>
          </div>
       
             <div  className="wrapper">
                <label htmlFor="">Password</label>
                <input
                          type="password"
                          name= 'password'
                          value={userDetails.password}
                          onChange={(e)=> handleChange(e)}
                        ></input>
              </div>
      

          <div  className="wrapper">
  <label htmlFor="">Bio</label>
  <input
            type="text"
            name= 'bio'
            placeholder="a little about yourself"
            value={userDetails.bio}
            onChange={(e)=> handleChange(e)}
          ></input>
</div>
     
          <button type='submit'>Sign Up</button>
    </form>
    </div>
  )
  const afterSignUp = (
    <div className="after-signup">
      <h1>All ready to use Chatter! 🤩</h1>
      <h2>
      <Link to ='/auth'>Start ASAP 📝</Link>
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

//NEWWW
// import React from "react";
// import {useState} from 'react'

// import {app,auth,db} from '../authentication/firebase'; //maybe shd be auth
// import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove,collection, getDocs } from 'firebase/firestore';
// export default function ToFollow({item}){
//     //state
//     const [following,setFollowing] = useState(false)

//     //functions to handle state
//             //function to follow a person
//             async function followUser({firstName,id}){
//                 const db = getFirestore();
//                 const usersCollectionRef = doc(db, "users", auth.currentUser.uid); // Use the correct user ID here
              
//                 // Update the tweets array in the user's document using arrayUnion
//                 await updateDoc(usersCollectionRef, {
//                   following: arrayUnion({firstName,id})
//                 });
//                 console.log('user followed')
//                 setFollowing(true)
//             }
//             //function to unfollow a person
//            async function unfollowUser({id}){
//                 try {
//                     const db = getFirestore();
//                     const usersCollectionRef = doc(db, "users", auth.currentUser.uid);
              
//                     // Update the following array in the user's document using arrayRemove
//                     await updateDoc(usersCollectionRef, {
//                       following: arrayRemove(id)
//                     });
              
//                     console.log('user unfollowed');
//                     setFollowing(false);
//                   } catch (error) {
//                     console.error(error.message);
//                   }
//                   console.log('user unfollowed')
//                   setFollowing(false)
//             }

//     //buttons to be displayed
//     const isFollowing = (
//         <button onClick = {()=>unfollowUser(item)} >Unfollow</button>
//     )
//     const notFollowing = (
//         <button onClick={()=>followUser(item)}>Follow</button>
//     )
//     return(
//         <> 
//         <div className="person">
//             <h6>{item.firstName}</h6>
//             <h6>{item.bio}</h6>
//             {
//                 following ? isFollowing : notFollowing
//             }
//         </div>
//         </>
//     )
// }