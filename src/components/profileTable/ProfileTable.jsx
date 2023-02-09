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
        <table className='profile-table'>
          <thead>
            {title === 0 ? 
            <tr>
              <th style={{width:"65%"}} scope='col'>제목</th>
              <th scope='col'>작성일</th>
              <th style={{width:"20%"}} scope='col'>조회수</th>
            </tr> : null}
            {title === 1 ? 
            <tr>
              <th>댓글</th>
            </tr> : null}
            {title === 2 ? 
            <tr>
              <th style={{width:"60%"}}>제목</th>
              <th>작성일</th>
              <th>작성자</th>
              <th>조회</th>
            </tr> : null}
          </thead>
          <tbody>

            {data === null && title === 0 ?
              <tr>
                <td className='profil e-comment-null' colSpan="3">작성하신 글이 없습니다.</td>
              </tr> : null}
            {data !== null && title === 0 ? 
              <tr>
                <td style={{textAlign:"start"}}>
                  <input type="checkbox" className='profile-checkbox'></input>
                  <span>글 제목@@@</span>
                </td>
                <td>
                  <span>2023.01.15</span>
                </td>
                <td>
                  <span>155</span>
                </td>
              </tr>
            : null}

            {data === null && title === 1 ? 
              <tr>
                <td className='profile-comment-null'>작성하신 댓글이 없습니다.</td>
              </tr> : null}
            {data !== null && title === 1 ?
              <tr>
                <td className='comment-td'>
                  <span>
                    <input type="checkbox" className='profile-checkbox'></input>
                    댓글!!!!!!!!!!!!!!!!!!!!
                  </span>
                  <span>2023.01.15</span>
                  <span>2023.01.15</span>
                </td>
              </tr> : null}

            {data === null && title === 2 ? 
              <tr>
                <td className='profile-comment-null' colSpan="4">좋아요 하신 글이 없습니다.</td>
              </tr> : null}
            {data !== null && title === 2 ?
            <tr>
              <td>
                <input type="checkbox" className='profile-checkbox'></input>
                <span>글 제목@@@</span>
              </td>
              <td>
                <span>2023.01.15</span>
              </td>
              <td>
                <span>155</span>
              </td>
            </tr> : null}

          </tbody>
        </table>
       </div>
    </div>
  )
}

export default ProfileTable