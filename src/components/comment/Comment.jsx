import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import "./Comment.scss"
import { useEffect } from 'react'
import heart from "../../assets/heart.png"
import heart2 from "../../assets/heart2.png"
import Report from '../modal/Report';
import { BsLink45Deg } from "react-icons/bs";
import { CopyToClipboard } from "react-copy-to-clipboard/src";
import Swal from "sweetalert2";

const Comment = () => {
  const location = useLocation()
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data,setData] = useState([])
  const [comment,setComment] = useState("")
  const [modi,setModi] = useState("")
  const [first,setFirst] = useState("")
  const [modicheck, setModiCheck] = useState(false)
  const [modiIdx,setIndex] = useState('')
  const [auth2,setAuth2] = useState(false)
  const url = window.location.href;

  const handleComment = (e) =>{
    setComment(e.target.value)
  }

  const modiComment = (e) =>{
    setModi(e.target.value)
  }

  const modion = (id) => {
    setIndex(id)
    setModiCheck((prev)=>!prev)
  }

  const getComment = async () => {
    const repo = await axios.get(`/boards/${location.state.id}/comments`,{
      headers:{
        'Authorization': 'Bearer '+localStorage.getItem("accessToken")
    }})
    setData(repo.data.data)
  }

  const postComment = async () => {
    if(comment.length < 2){
      Swal.fire({title:"댓글은 최소 2글자여야 합니다 !"})
      return
    }
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
      const repo = await axios.delete(`/boards/${location.state.id}/comments/${id}`,{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
      }})
      console.log(repo.status)
      if(repo.status === 200){
        Swal.fire({title:"댓글 삭제 완료 !"})
        getComment()
      }
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
  const unlikeHandle = async () => {
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
    if(modi.length < 2){
      Swal.fire({title:"댓글은 최소 2글자여야 합니다 !"})
      return
    }
    try{
      const repo = await axios.patch(`/boards/${location.state.id}/comments/${id}`,{
        content:modi
      },{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
      }})
      console.log(repo.data.data)
      if(repo.data.data === "comment 수정이 완료 되었습니다."){
        getComment()
        setModiCheck((prev)=>!prev)
      }
    }catch(error){
      console.log(error)
    }
  }
  const commentLike = async (id) => {
    try{
      const repo = await axios.patch(`/boards/${location.state.id}/comments/${id}/like`,{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
      }})
      console.log(repo)
    }catch(error){
      console.log(error)
    }
  }
  
  const getFirstNamae = () => {
    setFirst(localStorage.getItem("user")[0])
  }

  const handleModal = () => {
    setModalIsOpen((prev)=>!prev)
  }
  useEffect(()=>{
    getFirstNamae()
    getComment()
  },[])
  return (
    <div className='comment'>
      <hr style={{opacity:"0.3",color:"gray",margin:"15px 5px 15px 24px"}}></hr>
      
      <div className='comment-bottom'>
        <div className='comment-ul'>
          <span className='comment-element'>댓글 {data.length}</span>
          {/* <span className='comment-element'>좋아요 </span>
          <img className='comment-likeIcon' src={heart2} onClick={()=>likeHandle()}></img> */}
        </div>
        <div className='comment-ul'>
          <CopyToClipboard text={url} onCopy={() => Swal.fire({
          text:"링크 복사 !",
          confirmButtonColor: '#488bf4',
          })}><BsLink45Deg style={{color:"gray",fontSize:"22px",marginRight:"9px", cursor:"pointer"}}></BsLink45Deg></CopyToClipboard>
          <span className='board-report' onClick={()=>handleModal()}>신고</span>
        </div>
      </div>
      
      <div className='comment-container'>
        <div className='comment-userbox'>
          <span className='comment-surname'>{first}</span>
        </div>
        <textarea value={comment} onChange={handleComment} maxLength={200}></textarea>
        <a><button className='comment-confirm' onClick={()=>postComment()}>등록</button></a>
      </div>

      {data.map((datas,index)=>{
        if(datas.mine === true){
        }
        return(
          <div className='origin-comment' key={index}>
            <div className='comment-info'>
              <div className='comment-left'>
                <span className='comment-username'>형식</span>
                <img src={heart} alt='like' onClick={()=>commentLike(datas.id)}></img>
                <span className='like-count'>{datas.likeView}</span>
                {/* <span className='comment-date'>2022. 10. 15. &nbsp; 15:30</span> */}
                {/* <button className='comment-reply' onClick={()=>commentControlOn(0)}>답글</button> */}
              </div>
              <div className='comment-right'>
                {datas.mine ? 
                <div>
                  <span className='comment-option' onClick={()=>modion(index)}>수정</span>
                  <span className='comment-option' onClick={()=>deleteComment(datas.id)}>삭제</span>
                </div> : null}
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
            {modicheck === true && modiIdx === index ? 
              <div className='modi-container'>
                <textarea value={modi} onChange={modiComment} maxLength={200} className='modi-textarea'></textarea>
                <span className='comment-option2' onClick={()=>editComment(datas.id)}>수정</span>
                <span className='comment-option2' onClick={()=>modion()}>닫기</span>
              </div> : null}
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