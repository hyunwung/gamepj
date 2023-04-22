import React, { useState } from 'react'
import "./ModiBoard.scss"
import TextEditor from '../textEditor/TextEditor'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const ModiBoard = () => {
  const location = useLocation();
  const [submit,setSubmit] = useState(false)
  const [data,setData] = useState("")
  const [modi,setModi] = useState(true)
  const [title,setTitle] = useState("")
  const [category,setCategory] = useState(0)

  const getBoardData = async () =>{
    try{
      const repo = await axios.get(`/boards/${location.state.id}`,{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
        }
      })
      console.log(repo)
      setData(repo)
    }catch(error){
      console.log(error)
    }
  }
  const submitData = () => {
    setModi(true)
  }
  const onChange = (e) => {
    setTitle(e.target.value)
  }
  const handleSelect = (e) => {
    setCategory(e.target.value)
  }
  
  useEffect(()=>{
    getBoardData()
  },[])
  return (
    <div className='ModiBoard'>
      <div className='ModiBoard-container'>
        <span>제목</span>
        <input type="text" className='board-title' defaultValue={title} placeholder="글 제목" onChange={onChange}></input>
        <span>카테고리</span>
        <select onChange={handleSelect} value={category}>
          <option value="0">선택해주세요</option>
          <option value="1">버그</option>
          <option value="2">자유게시판</option>
          <option value="3">공지사항</option>
        </select>
        <span>내용</span>
        <TextEditor title={title} category={category} submit={submit} setSubmit={setSubmit} modi={modi}></TextEditor>
        <a href='/main'><button className='board-submit' onClick={()=>submitData()}><span>수정</span></button></a>
      </div>
    </div>
  )
}

export default ModiBoard