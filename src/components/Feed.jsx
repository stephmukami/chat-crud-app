import React from 'react'
import { useState,useEffect } from 'react';
import Content from './Content';
import ToFollow from './Content';
import {signOut } from "firebase/auth";
import {app,auth,db} from '../authentication/firebase'; //maybe shd be auth
import { getFirestore, doc, updateDoc, arrayUnion, collection, getDocs,getDoc } from 'firebase/firestore';

export default function Feed(){
//state
   const [crumb,setCrumb] = useState( {
    userCrumb : ''
    } )
   
   const [getName,setGetName] = useState(null)

    //handling state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCrumb((prevCrumb) => ({
          ...prevCrumb,
          [name]: value
        }));
      };

      //handling submit
      const handleSubmit = (e)=>{
        e.preventDefault()
        addCrumbToFirestore(crumb.userCrumb)
        setCrumb((prevCrumb)=>({
          ...prevCrumb,
          userCrumb : '' // Reset the input field state
        })); 
      }

  
//adding the input to firestore
async function addCrumbToFirestore(crumbText) {
  const db = getFirestore();
  const usersCollectionRef = doc(db, "users", auth.currentUser.uid); // Use the correct user ID here

  // Update the tweets array in the user's document using arrayUnion
  await updateDoc(usersCollectionRef, {
    crumbs: arrayUnion(crumbText)
  });
  console.log('crumb eaten')
}
// The arrayUnion operation is used to add elements to an array field in a document if they do not already exist

//getting the signed in person name
    
// Retrieve users to follow from Firestore on component mount
useEffect(() => {
  const colRef = collection(db, 'users');

  getDocs(colRef)
    .then((snapshot) => {
      const fetchedPeople = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      
      }));

      // Filter out the signed-in user from the fetched users
    const signedInUserId = auth.currentUser.uid;

  // Find the signed-in user's data and update the authUser state
        const signedInUser = fetchedPeople.find((person) => person.id === signedInUserId);
        if (signedInUser) {
          setGetName(signedInUser);
        }
    })
    .catch((err) => {
      console.log(err.message);
    });
}, []); // Empty dependency array ensures this effect runs only once on component mount
    
    return(
        <>
        <h1>Feed page</h1>
        {getName && <h3>{`Hello ${getName.firstName}`}</h3>}

        <div className='feed-container'>
        
          <div className='user-input'>
                <form onSubmit={handleSubmit}>
                    <input
                     type="text"
                     name = 'userCrumb' //name and state should be the same
                     value={crumb.userCrumb}
                     onChange={(e)=> handleChange(e)}
                      />
                    <button type='submit'>Send</button>
                </form>
            </div>

            <div className='col-two'>
              <p>CONTENT</p>
                  <Content/>
            </div>
          
          
        </div>
        </>
    )
}