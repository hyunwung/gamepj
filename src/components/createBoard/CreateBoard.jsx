import React, { useState } from 'react'
import "./CreateBoard.scss"
import { TextEditor } from '../textEditor/TextEditor'
import { useEffect } from 'react';

const CreateBoard = () => {
  const [submit,setSubmit] = useState(false)
  const [title,setTitle] = useState("")
  const submitData = () => {
    setSubmit(true)
  }
  const onChange = (e) => {
    setTitle(e.target.value)
  }

  return (
    <div className='createBoard'>
      <div className='createBoard-container'>
        <span>제목</span>
        <input type="text" className='board-title' placeholder="글 제목" value={title} onChange={onChange}></input>
        <span>내용</span>
        <TextEditor title={title} submit={submit}  setSubmit={setSubmit}></TextEditor>
        <a href='/main'><button className='board-submit' onClick={()=>submitData()}>제출</button></a>
      </div>
    </div>
  )
}

export default CreateBoard