import React from "react";
import {useState} from 'react'

import {auth} from '../authentication/firebase'; //maybe shd be auth
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
export default function ToFollow({item}){
    //state
    const [following,setFollowing] = useState(false)

    //functions to handle state
            //function to follow a person
            async function followUser({firstName,id}){
               try { 
                const db = getFirestore();
                const usersCollectionRef = doc(db, "users", auth.currentUser.uid); 
              
                // Update the tweets array in the user's document using arrayUnion
                await updateDoc(usersCollectionRef, {
                  following: arrayUnion({firstName,id})
                });
                console.log('user followed')
                setFollowing(true)
            } catch(error){
                console.error(error.message)
            }
        }
            //function to unfollow a person
           async function unfollowUser({id,firstName}){
                try {
                    const db = getFirestore();
                    const usersCollectionRef = doc(db, "users", auth.currentUser.uid);
              
                    // Update the following array in the user's document using arrayRemove
                    await updateDoc(usersCollectionRef, {
                      following: arrayRemove({id,firstName})
                    });
              
                    console.log('user unfollowed');
                    setFollowing(false);
                  } catch (error) {
                    console.error(error.message);
                  }
                  
            }

    //buttons to be displayed
    const isFollowing = (
        <button onClick = {()=>unfollowUser(item)} >Unfollow</button>
    )
    const notFollowing = (
        <button onClick={()=>followUser(item)}>Follow</button>
    )
    return(
        <> 
        <div className="person">
            <h6>{item.firstName}</h6>
            <h6>{item.bio}</h6>
            {
                following ? isFollowing : notFollowing
            }
        </div>
        </>
    )
}