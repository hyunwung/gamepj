import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import "./Comment.scss"
import { useEffect } from 'react'
import heart2 from "../../assets/heart2.png"
import Report from '../modal/Report';
import { BsLink45Deg } from "react-icons/bs";

const Comment = () => {
  const location = useLocation()
  // const [ex , setEx] = useState()
  // const [commentCT,setCommentCT] = useState()
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data,setData] = useState([])
  const [comment,setComment] = useState("")

  const handleComment = (e) =>{
    setComment(e.target.value)
  }

  const getComment = async () => {
    const repo = await axios.get(`/boards/${location.state.id}/comments`,{
      headers:{
        'Authorization': 'Bearer '+localStorage.getItem("accessToken")
    }})
    console.log(repo)
    setData(repo.data.data)
  }

  const postComment = async () => {
    try{
      await axios.post(`/boards/${location.state.id}/comments`,{content:comment},{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
      }})
      setComment("")
      getComment()
    }catch(error){
      console.log(error)
    }
  }
  const deleteComment = async (id) => {
    try{
      await axios.delete(`/boards/${location.state.id}/comments/${id}`,{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
      }})
    }catch(error){
      console.log(error)
    }
  }
  const likeHandle = async () => {
    try{
      const repo = await axios.post(`/boards/${location.state.id}/likes`,{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
      }})
      console.log(repo)
      getComment()
    }catch(error){
      console.log(error)
    }
  }
  const editComment = async (id) => {
    try{
      await axios.patch(`/boards/${location.state.id}/comments/${id}`,{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
      }})
    }catch(error){
      console.log(error)
    }
  }
  const handleModal = () => {
    setModalIsOpen((prev)=>!prev)
  }
  // const commentOn = (id) => {
  //   if (id === 0){
  //     setData([{id:0,datas:"여기 댓글과 내용들이 작성됩니다."},{id:1,datas:"여기 댓글과 내용들이 작성됩니다."},{id:2,datas:"여기 댓글과 내용들이 작성됩니다"}])
  //     setEx(0)
  //   }
  //   if (id === 1){
  //     setData([{id:0,datas:"여기 댓글과 내용들이 작성됩니다."},{id:1,datas:"여기 댓글과 내용들이 작성됩니다."},{id:2,datas:"여기 댓글과 내용들이 작성됩니다"}])
  //     setEx(1)
  //   }
  // }
  // const commentOff = () => {
  //   setEx()
  // }
  // const commentControlOn = (id) => {
  //   setCommentCT(id)
  // }
  
  // const commentControlOff = () => {
  //   setCommentCT()
  // }
  useEffect(()=>{
    getComment()
  },[])
  console.log(comment)
  return (
    <div className='comment'>
      <hr style={{opacity:"0.3",color:"gray",margin:"15px 5px 15px 24px"}}></hr>
      
      <div className='comment-bottom'>
        <div className='comment-ul'>
          <span className='comment-element'>댓글 {data.length}</span>
          <span className='comment-element'>좋아요 </span>
          <img className='comment-likeIcon' src={heart2} onClick={()=>likeHandle()}></img>
        </div>
        <div className='comment-ul'>
          <BsLink45Deg style={{color:"gray",fontSize:"22px",marginRight:"9px", cursor:"pointer"}}></BsLink45Deg>
          <span className='board-report' onClick={()=>handleModal()}>신고</span>
        </div>
      </div>
      
      <div className='comment-container'>
        <div className='comment-userbox'>
          <span className='comment-surname'>형</span>
        </div>
        <textarea value={comment} onChange={handleComment} maxLength={200}></textarea>
        <a><button onClick={()=>postComment()}>등록</button></a>
      </div>

      {data.map((datas,index)=>{
        return(
          <div className='origin-comment' key={index}>
            <div className='comment-info'>
              <div className='comment-left'>
                <span className='comment-username'>형식</span>
                <span className='comment-date'>2022. 10. 15. &nbsp; 15:30</span>
                {/* <button className='comment-reply' onClick={()=>commentControlOn(0)}>답글</button> */}
              </div>
              <div className='comment-right'>
                  <span className='comment-option' onClick={()=>editComment(datas.id)}>수정</span>
                  <span className='comment-option' onClick={()=>deleteComment(datas.id)}>삭제</span>
                  
              </div>
            </div>
            <div className='comment-bottom'>
              <p>{datas.comment}</p>
            </div>
            {/* {commentCT === 0 ? 
              <div className='comment-input-container'>
                <input className='comment-input'></input>
                <button onClick={()=>commentControlOff()}>닫기</button>
              </div> : null}
            {ex === 0 ? 
              <div>
                <p className='comment-answer' onClick={commentOff}>답글 숨기기</p>
                <div className='other-comment'>
                  <div className='comment-info'>
                    <div className='comment-left'>
                      <span className='comment-username'>하림 |</span>
                      <span className='comment-date'>2022. 10. 15. &nbsp; 15:30</span>
                      <button className='comment-reply' onClick={()=>commentControlOn(1)}>답글</button>
                    </div>
                    <div className='comment-right'>
                      <span className='comment-option'>수정</span>
                      <span className='comment-option'>삭제</span>
                    </div>
                  </div>
                  <div className='comment-bottom'>
                    <p>여기 대댓글과 내용들이 작성됩니다</p>  
                  </div>
                  {commentCT === 1 ? 
                    <div className='comment-input-container'>
                      <input className='comment-input'></input>
                      <button onClick={()=>commentControlOff()}>닫기</button>
                    </div> : null}
                </div>
              </div>
              : <p className='comment-answer' onClick={()=>commentOn(0)}>답글 2개 모두 보기</p>} */}
              </div>
            )}
          )}

      {/* <div className='origin-comment'>
        <div className='comment-info'>
          <div className='comment-left'>
            <span className='comment-username'>형식 &nbsp; |</span>
            <span className='comment-date'>2022. 10. 15. &nbsp; 15:30</span>
            <button className='comment-reply' onClick={()=>commentControlOn(0)}>답글</button>
          </div>
          <div className='comment-right'>
            <span className='comment-option'>수정</span>
            <span className='comment-option'>삭제</span>
          </div>
        </div>
        <div className='comment-bottom'>
          <p>여기 댓글과 내용들이 작성됩니다</p>  
        </div>
        {commentCT === 0 ? 
          <div className='comment-input-container'>
            <input className='comment-input'></input>
            <button onClick={()=>commentControlOff()}>닫기</button>
          </div> : null}

        {ex === 0 ? 
          <div>
            <p className='comment-answer' onClick={commentOff}>답글 숨기기</p>
            <div className='other-comment'>
              <div className='comment-info'>
                <div className='comment-left'>
                  <span className='comment-username'>하림 |</span>
                  <span className='comment-date'>2022. 10. 15. &nbsp; 15:30</span>
                  <button className='comment-reply' onClick={()=>commentControlOn(1)}>답글</button>
                </div>
                <div className='comment-right'>
                  <span className='comment-option'>수정</span>
                  <span className='comment-option'>삭제</span>
                </div>
              </div>
              <div className='comment-bottom'>
                <p>여기 대댓글과 내용들이 작성됩니다</p>  
              </div>
              {commentCT === 1 ? 
                <div className='comment-input-container'>
                  <input className='comment-input'></input>
                  <button onClick={()=>commentControlOff()}>닫기</button>
                </div> : null}
            </div>
          </div>
          : <p className='comment-answer' onClick={()=>commentOn(0)}>답글 2개 모두 보기</p>}
        </div> */}
        {/* 팝업창 */}
      <Report modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}></Report>
    </div>
  )
}

export default Comment