import React from "react";
import { useState ,useEffect} from 'react'
import { auth,db } from '../authentication/firebase';
import { getFirestore, collection,doc, getDoc,getDocs,updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export default function Content() {
  //STATES

  //timeline
  const [timeLine,setTimeLine] = useState([])

  //obtaining people to follow
const [people, setPeople] = useState([]);

//users own crumbs
const [ownCrumbs,setOwnCrumbs ] = useState([])

// Retrieve users to follow from Firestore on component mount
useEffect(() => {
  const colRef = collection(db, 'users');

  getDocs(colRef)
    .then((snapshot) => {
      const fetchedPeople = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        isFollowing:false
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
        }
    })
    .catch((err) => {
      console.log(err.message);
    });
}, []); // Empty dependency array ensures this effect runs only once on component mount


  //function to follow a person
  async function followUser({ firstName, id, crumbs }) {
    try {
      const db = getFirestore();
      const usersCollectionRef = doc(db, "users", auth.currentUser.uid);

      // Update the tweets array in the user's document using arrayUnion
      await updateDoc(usersCollectionRef, {
        following: arrayUnion({ firstName, id, crumbs }) //SHOULD BE FOLLOWING
      });

       // Find the user in the people state and set isFollowing to true
    setPeople(prevPeople => prevPeople.map(person => {
      if (person.id === id) {
        return { ...person, isFollowing: true };
      }
      return person;
    }));
      console.log('user followed');
      getCrumbs();
    } catch (error) {
      console.error(error.message);
    }
  }

  //function to unfollow a person
  async function unfollowUser({ id, firstName, crumbs }) {
    try {
      const db = getFirestore();
      const usersCollectionRef = doc(db, "users", auth.currentUser.uid);

      // Update the following array in the user's document using arrayRemove
      await updateDoc(usersCollectionRef, {
        following: arrayRemove({ id, firstName, crumbs }) //SHOULD BE FOLLOWING
      });

        // Find the user in the people state and set isFollowing to false
    setPeople(prevPeople => prevPeople.map(person => {
      if (person.id === id) {
        return { ...person, isFollowing: false };
      }
      return person;
    }));
      console.log('user unfollowed');
      getCrumbs();
    } catch (error) {
      console.error(error.message);
    }
  }

  //SETTING TIMELINE
  //retrieving crumbs of users in the array called following
  function getCrumbs(){
    const signedInUser = auth.currentUser;
    if (!signedInUser) {
      // Handle the case where the user is not signed in
      alert('sign in first')
      console.log('sign in first')
    }
  
    const signedInUserId = signedInUser.uid;
    const userRef = doc(db, "users", signedInUserId); // Reference to the signed-in user's document
  
    // get collection data
    getDoc(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.data();
        const followingArray = userData.following || [];
  
        // Extract the crumbs array from each user object and push them into the books array
        // let followingCrumbs = [];
        // followingArray.forEach((user) => {
         
        //   followingCrumbs.push({...user.firstName,...user.crumbs});
        // });

        // setTimeLine(followingCrumbs)
        // Create a new array with objects containing firstName and crumbs properties
        const followingData = followingArray.map((user) => ({
          firstName: user.firstName,
          crumbs: user.crumbs,
        }));

        setTimeLine(followingData);
  
        console.log("the users are");
        console.log(followingData);
        console.log('the state is')
        console.log(timeLine)
  
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
  }


  useEffect(() => {
    console.log('Updated timeline:', timeLine);
  }, [timeLine]);

  // //buttons to be displayed
  // const isFollowing = (
  //   <button onClick={() => unfollowUser(item)}>Unfollow</button>
  // );
  // const notFollowing = (
  //   <button onClick={() => followUser(item)}>Follow</button>
  // );

  //function to get own crumbs
  function getOwnCrumbs(){
    const signedInUser = auth.currentUser;
    if (!signedInUser) {
      // Handle the case where the user is not signed in
      alert('sign in first')
      console.log('sign in first')
    }
  
    const signedInUserId = signedInUser.uid;
    const userRef = doc(db, "users", signedInUserId); // Reference to the signed-in user's document
  
    // get collection data
    getDoc(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.data();
        const ownCrumbs = userData.crumbs || [];
        setOwnCrumbs(ownCrumbs)
  
        console.log('the personal crumbs are ')
        console.log(ownCrumbs)
  
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
  }
  //get own crumbs 
  useEffect( () =>{
    getOwnCrumbs()
  },[ownCrumbs]

  )

  return (
    <>
    <div className="content-container">
      <div className="col-one">
      <p className="current-chatter">current chatter is </p>
            { timeLine.map((datum)=>{
              return(
                <div key={datum.id}>
                    
                    {
                      datum.crumbs.map((crumb,index)=>(
                          <div className='time-div' key={index}>
                            <h6>{datum.firstName}</h6>
                              <p>{crumb}</p>
                          </div>
                      ))
                    }
                </div>
              )
            })

            }
      </div>
      <div className="col-two">
        <div className="row-one">
                <h3 >People  you can follow</h3>
            {people.map((item) => (
          <div className="other-users" key={item.id}>
            <div>
              <h6>{item.firstName}</h6>
              <h6>{item.bio}</h6>
            </div>
            <div>
                {item.isFollowing ? (
                  <button onClick={() => unfollowUser(item)}>Unfollow</button>
                ) : (
                  <button onClick={() => followUser(item)}>Follow</button>
                )}
            </div>
           
          </div>
        ))}
        </div>
      

        
        <div className="row-two">
          <h3>Your own Chats</h3>
            {
              ownCrumbs.map((item)=>{
                return(
                  <div className="own-chat" > 
                    <p>{item}</p>
                  </div>
                )
              })
            }
        </div>
      </div>
  
        </div>
    </>
    
  );
}


// {timeLine.map((datum) => {
//   return (
//     <div key={datum.id}>
//       <h6>{datum.firstName}</h6>
//       {datum.crumbs.map((crumb, index) => (
//         <div key={index}>
//           <p>{crumb}</p>
//         </div>
//       ))}