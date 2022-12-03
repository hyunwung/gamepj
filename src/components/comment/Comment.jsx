import React, { useState } from 'react'
import "./Comment.scss"

const Comment = () => {
  const [ex , setEx] = useState()
  const [data,setData] = useState([])
  const commentOn = (id) => {
    if (id == 0){
      setData([{id:0,datas:"여기 댓글과 내용들이 작성됩니다."},{id:1,datas:"여기 댓글과 내용들이 작성됩니다."},{id:2,datas:"여기 댓글과 내용들이 작성됩니다"}])
      setEx(0)
    }
    if (id == 1){
      setData([{id:0,datas:"여기 댓글과 내용들이 작성됩니다."},{id:1,datas:"여기 댓글과 내용들이 작성됩니다."},{id:2,datas:"여기 댓글과 내용들이 작성됩니다"}])
      setEx(1)
    }
  }
  const commentOff = () => {
    setEx()
  }
  return (
    <div className='comment'>
      <hr style={{opacity:"0.3",color:"gray",margin:"15px 5px 15px 24px"}}></hr>
      <span className='comment-count'>댓글 2</span>
      <div className='comment-container'>
        <textarea></textarea>
        <a><button>등록</button></a>
      </div>

      <div className='origin-comment'>
        <div className='comment-info'>
          <span className='comment-username'>나는 형식</span>|
          <span className='comment-date'>2022. 10. 15. &nbsp; 15:30</span>
          <button className='comment-reply'>답글</button>
        </div>
        <div className='comment-bottom'>
          <p>여기 댓글과 내용들이 작성됩니다</p>  
        </div>
        {ex === 0 ? 
          <div>
            <p className='comment-answer' onClick={commentOff}>답글 숨기기</p>
            <div className='other-comment'>
              <div className='comment-info'>
                <span className='comment-username'>하림</span>|
                <span className='comment-date'>2022. 10. 15. &nbsp; 15:30</span>
                <button className='comment-reply'>답글</button>
              </div>
              <div className='comment-bottom'>
                <p>여기 대댓글과 내용들이 작성됩니다</p>  
              </div>
            </div>
          </div>
          : <p className='comment-answer' onClick={()=>commentOn(0)}>답글 2개 모두 보기</p>}
      </div>

      <div className='origin-comment'>
        <div className='comment-info'>
          <span className='comment-username'>현웅</span>|
          <span className='comment-date'>2022. 10. 15. &nbsp; 15:30</span>
          <button className='comment-reply'>답글</button>
        </div>
        <div className='comment-bottom'>
          <p >여기 댓글과 내용들이 작성됩니다</p>  
        </div>
        {ex === 1 ?
          <div>
            <p className='comment-answer' onClick={commentOff}>답글 숨기기</p>
          </div>
          : <p className='comment-answer' onClick={()=>commentOn(1)}>답글 2개 모두 보기</p>}
      </div>
    </div>
  )
}

export default Comment