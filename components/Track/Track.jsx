'use client'
import React from 'react'
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import useAuthStore from "../../store/authStore";
import TrackDelemate from './TrackDelemate';
import TrackUser from './TrackUser';



const Track = () => {

  const authUser = useAuthStore((state) => state.user);
	const  username  = authUser?.username
	const {  userProfile } = useGetUserProfileByUsername(username);


  return (
    
    <div>{(userProfile?.role=="user")?<TrackUser/>:<TrackDelemate/>}</div>
  )
}

export default Track