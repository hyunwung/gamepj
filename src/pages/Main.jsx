import React from 'react'
import NavBar from '../components/navBar/NavBar'
import { useNavigate } from "react-router-dom";
import "../assets/Global.scss"
import Board from '../components/board/Board'
import Header from '../components/header/Header'
import Notice from '../components/notice/Notice'
import Update from '../components/update/Update'
import Swal from "sweetalert2";
import { useEffect } from 'react';

const Main = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("user") !== null){
      if(localStorage.getItem("user").length > 8){
        Swal.fire({title:"닉네임을 2자~6자로 변경해주세요"})
        navigate("/profile")
      }
    }
  },[])
  
  return (
    <div className='default'>
      <Header></Header>
      <div className='default-slice'>
        <div className='여기에 이미지 1'></div>
        <div className='default-container'>
          <NavBar></NavBar>
          <div className='default-page'>
            <Board></Board>
            <Notice></Notice>
            <Update></Update>
          </div>
        </div>
        <div className='여기에 이미지 2'></div>
      </div>
    </div>
  )
}

export default Main