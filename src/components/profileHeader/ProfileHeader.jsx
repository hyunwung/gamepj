import React from 'react'
import "./ProfileHeader.scss"
import Header from '../header/Header'

const ProfileHeader = () => {
  return (
    <div className='profileHeader'>
      <Header></Header>
      <div className='profileHeader-container'>
        <div className='profile-left'>
          <div className='profile-logo'></div>
          <div className='profile-modi'>
            <input placeholder='닉네임' type="text"></input>
            <button>변경</button>
          </div>
          <span className='profile-exit'>회원탈퇴</span>
        </div>
        <div className='profile-right'>
          <div className='profile-items'>
            <span className='profile-item'>작성글</span>
            <span className='profile-item'>작성댓글</span>
            <span className='profile-item'>좋아요한 글</span>
          </div>
          <hr className='line1'></hr>
          <span className='profile-title'>댓글 || 작성글</span>
          <hr className='line2'></hr>
          {/* 댓글 or 작성글 */}
          <div className='profile-content'>
            <div className='profile-content-container'>
              <input type="checkbox" className='profile-checkbox'></input>
              <div>댓글 혹은 작성글 제목</div>
            </div>
            <div className='profile-content-date'>2023.01.15</div>
          </div>
          {/* 여기까지 */}
          <hr className='line2'></hr>
          <div className='profile-entire'>
            <div className='profile-entire-left'>
              <input type="checkbox"></input>
              <span>전체선택</span>
            </div>
            <a className='profile-entire-right'><button>삭제</button></a>
          </div>
        </div>
        {/* <span>내가 쓴 글</span>
        <span>내가 쓴 댓글</span> */}
      </div>
    </div>
  )
}

export default ProfileHeader