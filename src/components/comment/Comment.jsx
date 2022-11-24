import React from 'react'
import "./Comment.scss"

const Comment = () => {
  return (
    <div className='comment'>
      <hr style={{opacity:"0.3",color:"gray",margin:"15px 5px 15px 24px"}}></hr>
      <span className='comment-count'>댓글 2</span>
      <div className='comment-container'>
        {/* <div className='comment-username'>
          <span className='comment-profile'>현웅</span>
        </div> */}
        <textarea></textarea>
        <a><button>등록</button></a>
      </div>
      <div className='other-comment'>
        {/* <div className='comment-username'>
          <span className='comment-profile'>하림</span>
        </div> */}
        <div className='comment-info'>
          <span className='comment-username'>나는 형식</span>|
          <span className='comment-date'>2022. 10. 15. &nbsp; 15:30 </span>
          <button className='comment-reply'>답글</button>
        </div>
        <div className='comment-bottom'>
          <p className='other-comment-content'>여기 댓글과 내용들이 작성됩니다</p>  
        </div>
        <a href='/' className='comment-answer'>답글 2개 모두 보기</a>
      </div>
    </div>
  )
}

export default Comment