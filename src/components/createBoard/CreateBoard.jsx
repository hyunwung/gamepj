import React, { useState } from 'react'
import "./CreateBoard.scss"
import { TextEditor } from '../textEditor/TextEditor'

const CreateBoard = () => {
    const [data,setData] = useState("")
    
    return (
    <div className='createBoard'>
      <div className='createBoard-container'>
        <label>제목</label>
        <input type="text" className='board-title' placeholder="글 제목"></input>
        <label>내용</label>
        <TextEditor></TextEditor>
        <a><button className='board-submit'>제출</button></a>
      </div>
    </div>
  )
}

export default CreateBoard