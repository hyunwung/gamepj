import React, { useState } from 'react'
import "./CreateBoard.scss"

const CreateBoard = () => {
    const [data,setData] = useState("")
    
    return (
    <div className='createBoard'>
        <div className='createBoard-container'>
        <label>제목</label>
        <input type="file" class="inputImage" id="img1" name="1" accept="image/*"/>
        <label>내용</label>
        <textarea></textarea>
        <label>이미지</label>
        <input type="image"/>
        </div>
    </div>
  )
}

export default CreateBoard