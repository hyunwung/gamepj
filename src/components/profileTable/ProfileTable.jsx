import React from 'react'
import "./ProfileTable.scss"
import { useState } from 'react'

const ProfileTable = () => {
  const [title,setTitle] = useState(0)
  const handleTitle = (id) => {
    setTitle(id)
  }
  const [data,setData] = useState(1)
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
            {title === 0 ? <tr>
              <th scope='col'>제목</th>
              <th scope='col'>작성일</th>
              <th scope='col'>조회수</th>
            </tr> : null}
            {title === 1 ? <tr>
              <th scope='col'>댓글</th>
            </tr> : null}
            {title === 2 ? <tr>
              <th scope='col'>제목</th>
              <th scope='col'>작성일</th>
              <th scope='col'>작성자</th>
              <th scope='col'>조회</th>
            </tr> : null}
          </thead>
          <tbody>
            {title === 0 ? 
              <tr>
                <td>
                  <input type="checkbox" className='profile-checkbox'></input>
                  <span className='profile-content-title'>글 제목@@@</span>
                </td>
                <td>
                  <span className='profile-content-title-date'>2023.01.15</span>
                </td>
                <td>
                  <span className='profile-content-title-view'>155</span>
                </td>
              </tr>
            : null}
            {title === 1 ? 
              <tr>
                {data === null && title === 1 ?
                  <td>
                    <span className='profile-comment-null'>작성하신 댓글이 없습니다.</span>
                  </td>
                    : null}
                {data !== null && title === 1 ?
                    <td>
                      <div className='profile-type2'>
                        <div className='profile-type2-container'>
                          <input type="checkbox" className='profile-checkbox'></input>
                          <div>댓글 1</div>
                        </div>
                        <div className='profile-content-date'>2023.01.15</div>
                      </div>
                      <hr className='line2'></hr>
                    </td> : null}
              </tr>
            : null}
            {title === 2 ? 
              <div>
                {data === null && title === 2 ?
                  <tr>
                    <td>
                      <span className='profile-comment-null'>작성하신 댓글이 없습니다.</span>
                    </td>
                  </tr>
                  : null}
                {data !== null && title === 2 ?
                  <tr>
                    <td>
                      <input type="checkbox" className='profile-checkbox'></input>
                      <span className='profile-content-title'>글 제목</span>
                    </td>
                    <td>
                      <span className='profile-content-title-date'>2023.01.15</span>
                    </td>
                    <td>
                      <span className='profile-content-title-date'>김근육</span>
                    </td>
                    <td>
                      <span className='profile-content-title-view'>155</span>
                    </td>
                  </tr>
                : null}
              </div>
            : null}
          </tbody>
        </table>
       </div>
    </div>
  )
}

export default ProfileTable