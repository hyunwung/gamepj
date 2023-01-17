import React from 'react'
import ProfileHeader from '../components/profileHeader/ProfileHeader'
import Header from '../components/header/Header'

const Profile = () => {
  return (
    <div className='profile'>
      <Header></Header>
      <ProfileHeader></ProfileHeader>
    </div>
  )
}

export default Profile