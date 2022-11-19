import React from 'react'
import "./Comment.scss"

const Comment = () => {
  return (
    <div className='comment'>
      <hr style={{opacity:"0.3",color:"gray",margin:"15px 5px 15px 24px"}}></hr>
      <span className='comment-count'>댓글 2</span>
      <div className='comment-container'>
        <div className='comment-username'>
          <span className='comment-profile'>현웅</span>
        </div>
        <textarea></textarea>
        <a><button>등록</button></a>
      </div>
      <div className='other-comment'>
        <span className='comment-profile'>하림</span> &nbsp; |  &nbsp; 
        <span>2022. 10. 15. &nbsp; 15:30 </span>
        <button className='comment-reply'>답글</button>
        <span className='comment-comments'>그냥 댓글1</span>
      </div>
    </div>
  )
}

export default Comment