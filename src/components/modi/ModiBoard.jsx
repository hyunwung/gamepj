import React, { useState } from 'react'
import "./ModiBoard.scss"
import { ModiEditor } from '../textEditor/ModiEditor'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ModiBoard = () => {
  const [modi,setModi] = useState(true)
  const [title,setTitle] = useState("")
  const [category,setCategory] = useState(0)
  const location = useLocation()

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
    if(location.state.datas.data.title !== undefined){
      setTitle(location.state.datas.data.title)
    }
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
        <ModiEditor title={title} modi={modi} setModi={setModi} category={category} contents={location.state.datas.data.content} id={location.state.id}></ModiEditor>
        <a href='/main'><button className='board-submit' onClick={()=>submitData()}><span>저장</span></button></a>
      </div>
    </div>
  )
}

export default ModiBoard