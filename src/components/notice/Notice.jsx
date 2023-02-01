import React from 'react'
import "./Notice.scss"
import { AiFillHome ,AiFillStar ,AiFillEye} from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import like from "../../assets/heart.png"
import {useNavigate} from "react-router-dom"
import { BsFillPencilFill } from "react-icons/bs";
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Report from '../modal/Report';

const Notice = () => {
  const [datas,setData] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate()
  
  const getBoardData = async() =>{
    try{
      const repo = await axios.get("/all")
      if (repo.data.data.content[0] !== undefined){
        setData(repo.data.data.content)
        console.log(datas)
      }
    }catch(error){
      console.log(error)
    }
  }

  const enterRoom = (id) => {
    navigate(`/board/detail/${id}`,{state:{id:id}})
  }

  const handleModal = () => {
    setModalIsOpen((prev)=>!prev)
  }

  useEffect(()=>{
    getBoardData()
  },[])
  return (
    <div className='notice'>
      <div className='notice-container'>
        <div className='notice-title'>
          <div className='notice-title-name'>
            <AiFillHome style={{fontSize:"23px" , margin:"0 5px 4px 8px"}}></AiFillHome><h2 className='notice-span'>공지사항(2)</h2>
          </div>
          <a href='/create' className='create-board'>
            <BsFillPencilFill style={{fontSize:"16px"}}></BsFillPencilFill>
            <span>글쓰기</span>
          </a>
          <button onClick={()=>handleModal()}>신고하기</button>
          
        </div>
        <hr className='notice-line'></hr>
        {Array.isArray(datas) && datas.length === 0 || datas === undefined ? null : datas.map((data, index)=>{
          if(index >= 3){
            return
          }
          return(
            <div className='notice-box' key={index}>
              <div className='notice-box-contain' onClick={()=>enterRoom(data.id)}>
                <div className="notice-left">
                  <AiFillStar style={{margin:"0 5px 0 0",fontSize:"22px",color:"rgb(255, 221, 89)"}}></AiFillStar>
                  <a><h3 className='notice-title'>{data.title}</h3></a>
                </div>
                <div className="notice-right">
                  <span className="notice-date">{data.createTime[0]}. {data.createTime[1]} .{data.createTime[2]}</span>
                  <img src={like} className="notice-like"></img>
                  <span className="notice-like-count">{data.like}</span>
                  <AiFillEye style={{margin:"0 4px 0 4px",fontSize:"24px",color:"gray",float:"right"}}></AiFillEye>
                  <span className="notice-view">{data.views}</span>
                  
                </div>
              </div>
              <hr className='notice-line'></hr>
            </div>
          )
        })}
      </div>
      {/* 팝업창 */}
      <Report modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}></Report>
      <FiMoreHorizontal style={{fontSize:"24px", margin:"0 auto", display:"flex"}}></FiMoreHorizontal>
    </div>
  )
}

export default Notice