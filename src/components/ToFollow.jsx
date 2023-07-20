import React from "react";
import {useState} from 'react'
export default function ToFollow({name,bio,id}){
    //state
    const [following,setFollowing] = useState(true)

    //functions to handle state
            //function to follow a person
            function followUser(){

            }
            //function to unfollow a person
            function unfollowUser(){
                
            }

    //buttons to be displayed
    const isFollowing = (
        <button onClick={unfollowUser}>Unfollow</button>
    )
    const notFollowing = (
        <button onClick={followUser}>Follow</button>
    )
    return(
        <>
        <div className="person">
            <h6>{name}</h6>
            <h6>{bio}</h6>
            {
                following ? isFollowing : notFollowing
            }
        </div>
        </>
    )
}