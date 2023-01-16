import React from 'react'
import "./ProfileHeader.scss"
import Header from '../header/Header'
import { useState } from 'react'

const ProfileHeader = () => {
  const [title,setTitle] = useState(0)
  const handleTitle = (id) => {
    setTitle(id)
  }
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
            <span className='profile-item' onClick={()=>handleTitle(0)}>작성글</span>
            <span className='profile-item' onClick={()=>handleTitle(1)}>작성댓글</span>
            <span className='profile-item' onClick={()=>handleTitle(2)}>좋아요한 글</span>
          </div>
          <hr className='line1'></hr>
          {title === 0 ? 
            <div className='profile-title'>
              <span className='profile-title-set1'>제목</span>
              <span className='profile-title-set2'>작성일</span>
              <span className='profile-title-set3'>조회수</span>
            </div>
            : null}
          {title === 1 ? <span className='profile-title'>댓글</span> : null}
          {title === 2 ? 
            <div className='profile-title'>
              <span className='profile-title-set4'>제목</span>
              <span className='profile-title-set5'>작성일</span>
              <span className='profile-title-set6'>작성자</span>
              <span className='profile-title-set7'>조회수</span>
            </div>
            : null}

          <hr className='line2'></hr>
          {/* 댓글 or 작성글 */}
          <div className='profile-content'>
            <div className='profile-content-container'>
              <input type="checkbox" className='profile-checkbox'></input>
              <div>댓글 1</div>
            </div>
            <div className='profile-content-date'>2023.01.15</div>
          </div>
          <hr className='line2'></hr>

          <div className='profile-content'>
            <div className='profile-content-container'>
              <input type="checkbox" className='profile-checkbox'></input>
              <div>댓글 2</div>
            </div>
            <div className='profile-content-date'>2023.01.15</div>
          </div>
          <hr className='line2'></hr>

          <div className='profile-content'>
            <div className='profile-content-container'>
              <input type="checkbox" className='profile-checkbox'></input>
              <div>댓글 2</div>
            </div>
            <div className='profile-content-date'>2023.01.15</div>
          </div>
          <hr className='line2'></hr>

          <div className='profile-content'>
            <div className='profile-content-container'>
              <input type="checkbox" className='profile-checkbox'></input>
              <div>이건 작성글</div>
            </div>
            <div className='profile-content-date'>2023.01.15</div>
          </div>
          <hr className='line2'></hr>
          {/* 여기까지 */}
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