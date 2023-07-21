import React from "react";
import { useState ,useEffect} from 'react'
import { auth,db } from '../authentication/firebase';
import { getFirestore, doc, getDoc,updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export default function ToFollow({ item }) {
  //state
  const [following, setFollowing] = useState(false);
  const [timeLine,setTimeLine] = useState([])
  //functions to handle state

  //function to follow a person
  async function followUser({ firstName, id, crumbs }) {
    try {
      const db = getFirestore();
      const usersCollectionRef = doc(db, "users", auth.currentUser.uid);

      // Update the tweets array in the user's document using arrayUnion
      await updateDoc(usersCollectionRef, {
        following: arrayUnion({ firstName, id, crumbs })
      });
      console.log('user followed');
      setFollowing(true);
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
        following: arrayRemove({ id, firstName, crumbs })
      });

      console.log('user unfollowed');
      setFollowing(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  //SETTING TIMELINE
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
        let followingCrumbs = [];
        followingArray.forEach((user) => {
         
          followingCrumbs.push(...user.crumbs);
        });

        setTimeLine(followingCrumbs)
  
        console.log("the users are");
        console.log(followingCrumbs);
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
  }, [following]);


  //buttons to be displayed
  const isFollowing = (
    <button onClick={() => unfollowUser(item)}>Unfollow</button>
  );
  const notFollowing = (
    <button onClick={() => followUser(item)}>Follow</button>
  );

  return (
    <>
      <div className="person">
        <div>
          <h6>{item.firstName}</h6>
          <h6>{item.bio}</h6>
        </div>
        <div>
          {
            following ? isFollowing : notFollowing
          }
        </div>
      </div>
    </>
  );
}
