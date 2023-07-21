import React from 'react'
import { useState,useEffect } from 'react';
import ToFollow from './ToFollow';
import {signOut } from "firebase/auth";
import {app,auth,db} from '../authentication/firebase'; //maybe shd be auth
import { getFirestore, doc, updateDoc, arrayUnion, collection, getDocs,getDoc } from 'firebase/firestore';

export default function Feed(){
//state
   const [crumb,setCrumb] = useState( {
    userCrumb : ''
    } )
    const [nameDisplay, setnameDisplay] = useState(null); 
    const [timeLine,setTimeLine] = useState([])

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

//RETRIEVE USERS TO FOLLOW
 // State to store the retrieved users
 const [people, setPeople] = useState([]);

  // Retrieve users to follow from Firestore on component mount
  useEffect(() => {
    const colRef = collection(db, 'users');

    getDocs(colRef)
      .then((snapshot) => {
        const fetchedPeople = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));

        // Filter out the signed-in user from the fetched users
      const signedInUserId = auth.currentUser.uid;
      const filteredPeople = fetchedPeople.filter(
        (person) => person.id !== signedInUserId
      );

      setPeople(filteredPeople); // Update the people state with the fetched data excluding the signed-in user
         
          // Find the signed-in user's data and update the authUser state
          const signedInUser = fetchedPeople.find((person) => person.id === signedInUserId);
          if (signedInUser) {
            setnameDisplay(signedInUser);
          }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  console.log(people);

  // SETTING TIMELINE
 //retrieving crumbs of users in the array called following
 function getCrumbs(){
  const signedInUserId = auth.currentUser.uid;
  const userRef = doc(db, "users", signedInUserId); // Reference to the signed-in user's document

  // get collection data
  getDoc(userRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.data();
      const followingArray = userData.following || [];

      // Extract the crumbs array from each user object and push them into the books array
      let books = [];
      followingArray.forEach((user) => {
        setTimeLine((prevArray)=>[...prevArray,...user.crumbs])
        books.push(...user.crumbs);
      });

      console.log("the users are");
      console.log(books);
      console.log('the state is')
      console.log(timeLine)

    }
  })
  .catch((err) => {
    console.log(err.message);
  });
}

useEffect(() => {
  getCrumbs();
}, []);

    return(
        <>
        <h1>Feed page</h1>
        {nameDisplay && <h3>{`Hello ${nameDisplay.firstName}`}</h3>}
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
              <p>TIMELINE</p>
             {timeLine.length > 0 ? (
                  timeLine.map((item) => (
                    <div className='tl-object'>
                      <p>{item.crumbs}</p>
                    </div>
                  ))
                ) : (
                  <p>No crumbs to display.</p>
                )}
            </div>
          </div>
          <div className='col-two'>
            <div className='people-section'>
            <p>
              {
                  people.map((item)=>{ //or remove curly braces and return
                    return(
                      <ToFollow
                item={item}
                key = {item.id}
                      
                      />
                    )
                  })
              }
            </p>
            </div>
            <div className='personal-tweets'>

            </div>

          </div>
            
        </div>
        </>
    )
}