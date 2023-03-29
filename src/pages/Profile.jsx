import React from 'react'
import Header from '../components/header/Header'
import ProfileTable from '../components/profileTable/ProfileTable'
import ProfileSets from '../components/profileSets/ProfileSets'
import "../assets/Global.scss"

const Profile = () => {
  return (
    <div className='profile'>
      <Header></Header>
      <div className='profile-container'>
        <ProfileSets></ProfileSets>
        {/* <ProfileTable></ProfileTable> */}
      </div>
    </div>
  )
}

export default Profile