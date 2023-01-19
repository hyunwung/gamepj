import React from 'react'
import "./ProfileTable.scss"
import { useState } from 'react'

const ProfileTable = () => {
  const [title,setTitle] = useState(0)
  const handleTitle = (id) => {
    setTitle(id)
  }
  const [data,setData] = useState(null)
  return (
    <div className='profileTable'>
      <div className='profileTable-container'>  
        <div className='profile-items'>
          <span className='profile-item' onClick={()=>handleTitle(0)}>작성글</span>
          <span className='profile-item' onClick={()=>handleTitle(1)}>작성댓글</span>
          <span className='profile-item' onClick={()=>handleTitle(2)}>좋아요한 글</span>
        </div>
        <hr className='line1'></hr>
        <table className='profile-table'>
          <thead>
            <tr>
              <th scope='col'>제목</th>
              <th scope='col'>작성일</th>
              <th scope='col'>조회</th>
            </tr>
          </thead>
          <tbody>
            {/* {title === 0 ?  */}
              <tr>
                <td>
                  <input type="checkbox" className='profile-checkbox'></input>
                  <span className='profile-content-title'>글 제목</span>
                </td>
                <td>
                  <span className='profile-content-title-date'>2023.01.15</span>
                </td>
                <td>
                  <span className='profile-content-title-view'>155</span>
                </td>
              </tr>
            {/* : null} */}
          </tbody>
        </table>
          {/* <hr className='line1'></hr>
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
          
          {data !== null && title === 0 ?
          <div>
            <div className='profile-content'>
              <div className='profile-content-container'>
                <div>
                  <input type="checkbox" className='profile-checkbox'></input>
                  <span className='profile-content-title'>글 제목</span>
                </div>
                <div>
                  <span className='profile-content-title-date'>2023.01.15</span>
                  <span className='profile-content-title-view'>155</span>
                </div>
              </div>
            </div>
            <hr className='line2'></hr>
          </div> : null}
          {data === null && title === 0 ?
            <span className='profile-null'>작성하신 글이 없습니다.</span>
          : null}
          
          {data !== null && title === 1 ?
          <div>
            <div className='profile-content2'>
              <div className='profile-content-container'>
                <input type="checkbox" className='profile-checkbox'></input>
                <div>댓글 1</div>
              </div>
              <div className='profile-content-date'>2023.01.15</div>
            </div>
            <hr className='line2'></hr>
          </div> : null}
          {data === null && title === 1 ?
            <span className='profile-null'>작성하신 댓글이 없습니다.</span>
          : null}

          {data !== null && title === 2 ?
          <div>
            <div className='profile-content3'>
              <div className='profile-content-container'>
                <div>
                  <input type="checkbox" className='profile-checkbox'></input>
                  <span className='profile-content-like'>글 제목</span>
                </div>
                <div>
                  <span className='profile-content-like-date'>2023.01.15</span>
                  <span className='profile-content-like-name'>김근육</span>
                  <span className='profile-content-like-view'>155</span>
                </div>
              </div>
            </div>
          <hr className='line2'></hr>
          </div> : null}
          {data === null && title === 2 ?
            <span className='profile-null'>좋아요 하신 글이 없습니다.</span>
          : null}
          
          <div className='profile-entire'>
            <div className='profile-entire-left'>
              <input type="checkbox"></input>
              <span>전체선택</span>
            </div>
            {title === 2 ? <a className='profile-entire-right'><button className='btn2'>좋아요 취소</button></a> : <a className='profile-entire-right'><button className='btn'>삭제</button></a>}
          </div> */}
       </div>
    </div>
  )
}

export default ProfileTable