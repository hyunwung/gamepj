import React, { useState } from 'react'
import "./CreateBoard.scss"
import TextEditor from '../textEditor/TextEditor'
import { useEffect } from 'react';

const CreateBoard = () => {
  const [submit,setSubmit] = useState(false)
  const [title,setTitle] = useState("")
  const [category,setCategory] = useState(0)
  const submitData = () => {
    setSubmit(true)
  }
  const onChange = (e) => {
    setTitle(e.target.value)
  }
  const handleSelect = (e) => {
    setCategory(e.target.value)
  }
  return (
    <div className='createBoard'>
      <div className='createBoard-container'>
        <span className='create-input'>제목</span>
        <input type="text" className='board-title' placeholder="글 제목" value={title} onChange={onChange}></input>
        <span className='create-input'>카테고리</span>
        <select onChange={handleSelect} value={category}>
          <option>선택해주세요</option>
          <option value="1">버그</option>
          <option value="2">자유게시판</option>
          <option value="3">이벤트</option>
          <option value="4">업데이트</option>
          <option value="5">가이드</option>
          <option value="6">FAQ</option>
          <option value="7">공지사항</option>
          <option value="8">개발노트</option>
        </select>
        <span className='create-input'>내용</span>
        <TextEditor title={title} submit={submit} category={category} setSubmit={setSubmit}></TextEditor>
        <a href='#'><button className='board-submit' onClick={()=>submitData()}><span>저장</span></button></a>
      </div>
    </div>
  )
}

export default CreateBoard