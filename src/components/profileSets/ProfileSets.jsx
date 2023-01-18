import React from 'react'
import "./ProfileSets.scss"
import { useState } from 'react'

const ProfileSets = () => {
  return (
    <div className='profileSets'>
      <div className='profileSets-container'>
          <div className='profile-logo'></div>
          <div className='profile-modi'>
            <input placeholder='닉네임' type="text"></input>
            <button>변경</button>
          </div>
          <span className='profile-exit'>회원탈퇴</span>
        </div>
    </div>
  )
}

export default ProfileSets