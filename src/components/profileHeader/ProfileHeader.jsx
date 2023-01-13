import React from 'react'
import "./ProfileHeader.scss"
import Header from '../header/Header'

const ProfileHeader = () => {
  return (
    <div className='profileHeader'>
      <Header></Header>
      <div className='profileHeader-container'>
        <div>프로필 이미지</div>
        <span>닉네임</span>
        <span>내가 쓴 글</span>
        <span>내가 쓴 댓글</span>
      </div>
    </div>
  )
}

export default ProfileHeader