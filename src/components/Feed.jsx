import React from 'react'
import { useState } from 'react';
import {signOut } from "firebase/auth";
import {app,auth,db} from '../authentication/firebase'; //maybe shd be auth
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function Feed(){
//state
   const [crumb,setCrumb] = useState( {
    userCrumb : ''
    } )

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
          userCrumb : ''
        })); // Reset the input field state
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
// The arrayUnion operation is used to add elements 
//to an array field in a document if they do not already exist

//retrieve users to follow

    return(
        <>
        <h1>Feed page</h1>
        <div className='feed-container'>
          <div className='col-one'>
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
            <div className='timeline'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam suscipit, 
                dolorum animi dignissimos distinctio vel repellat minima beatae quas dolorem eos laboriosam ducimus quo tempora enim, quasi similique ipsa quidem fugit minus incidunt. Tempore quisquam quaerat inventore autem suscipit! Assumenda iste quidem vitae quod alias accusamus velit magnam! Voluptas, odit.
            </div>
          </div>
          <div className='col-two'>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
               consectetur molestiae dolor ipsam voluptas enim eius nihil dicta, porro blanditiis repudiandae illo provident optio sint consequuntur, numquam laborum quia? Aliquid tempora natus, ducimus illum voluptatem quasi dignissimos, quia ad similique vitae illo excepturi labore magnam vel, molestiae et expedita nostrum adipisci commodi repellat ipsam maxime! Eligendi.
            </p>
          </div>
            
        </div>
        </>
    )
}