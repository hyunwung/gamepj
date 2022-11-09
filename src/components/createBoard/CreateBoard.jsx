import React, { useState } from 'react'
import "./CreateBoard.scss"
import { TextEditor } from '../textEditor/TextEditor'

const CreateBoard = () => {
    const [data,setData] = useState("")
    
    return (
    <div className='createBoard'>
      <div className='createBoard-container'>
        <TextEditor></TextEditor>
      </div>
    </div>
  )
}

export default CreateBoard