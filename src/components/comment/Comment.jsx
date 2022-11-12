import React from 'react'
import "./Comment.scss"

const Comment = () => {
  return (
    <div className='comment'>
        <hr style={{opacity:"0.3",color:"gray",margin:"15px 5px 15px 24px"}}></hr>
        <span className='comment-count'>댓글 2</span>
        <div className='comment-container'>
          <div className='comment-username'>
            <span>현웅</span>
          </div>
          <textarea></textarea>
          <a><button>등록</button></a>
        </div>
    </div>
  )
}

export default Comment