import React, { useState } from 'react'
import "./CreateBoard.scss"
import TextEditor from '../textEditor/TextEditor'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';


const CreateBoard = ({modi ,id}) => {
  const navigate = useNavigate();
  const [submit,setSubmit] = useState(false)
  const [update,setUpdate] = useState(false)
  const [title,setTitle] = useState("")
  const [category,setCategory] = useState(0)
  const [data,setData] = useState('')

  const getBoardData = async () =>{
    try{
      const repo = await axios.get(`/boards/${id}`,{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
      }})
      console.log(repo.data.data)
      setData(repo.data.data)
      setTitle(repo.data.data.title)      
      setCategory(options[repo.data.data.type])
      
    }catch(error){
      console.log(error)
      Swal.fire({icon: 'warning', html:"로딩에 실패하였습니다. <br/>로그인을 해주세요."})
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      navigate("/login")
    }
  }

  const options = {
    'NOTICE':'1',
    'EVENT':'2',
    'UPDATE':'3',
    'DEVELOPER_NOTES':'4',
    'BUG':'5',
    'GUIDE':'6',
    'FAQ':'7'
  }

  const submitData = () => {
    setSubmit(true)
  }
  const updateData = () => {
    setUpdate(true)
  }
  const onChange = (e) => {
    setTitle(e.target.value)
  }
  const handleSelect = (e) => {
    setCategory(e.target.value)
  }
  useEffect(()=>{
    if(modi===true){
      getBoardData()
    }
  },[])
  return (
    <div className='createBoard'>
      <div className='createBoard-container'>
        <span className='create-input'>제 목</span>
        <input type="text" className='board-title' placeholder="글 제목" value={title} onChange={onChange}></input>
        <span className='create-input'>카테고리</span>
        <select onChange={handleSelect} value={category} defaultValue={category}>
          <option value="0">선택해주세요</option>
          <option value="1">공지사항</option>
          <option value="2">이벤트</option>
          <option value="3">업데이트</option>
          <option value="4">개발자 노트</option>
          <option value="5">버그</option>
          <option value="6">가이드</option>
          <option value="7">FAQ</option>
        </select>
        <span className='create-input'>내용</span>
        <TextEditor title={title} category={category} submit={submit} setSubmit={setSubmit} update={update} setUpdate={setUpdate} id={id} content={data.content} modi={modi}></TextEditor>
        {modi === true ?
          <a href='#'><button className='board-submit' onClick={()=>updateData()}><span>수정</span></button></a> :
          <a href='#'><button className='board-submit' onClick={()=>submitData()}><span>저장</span></button></a>}
      </div>
    </div>
  )
}

export default CreateBoard