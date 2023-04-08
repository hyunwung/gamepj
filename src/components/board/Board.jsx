import React from 'react'
import "./Board.scss"
import { AiFillStar ,AiFillEye} from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import {useNavigate} from "react-router-dom"
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Board = () => {
  const [datas,setData] = useState([])
  const [page,setPage] = useState(0)
  const navigate = useNavigate()
  
  const getBoardData = async() =>{
    try{
      const repo = await axios.get(`/boards?page=${page}`,{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
      }})
      console.log(repo)
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

  useEffect(()=>{
    getBoardData()
  },[])
  return (
    <div className='Board'>
      <div className='Board-container'>
        <div className='Board-title'>
          <div className='Board-title-name'>
            <h2 className='Board-span'>공지사항</h2>
          </div>
          <a href='/create' className='create-board'>
            <span>글쓰기</span>
          </a>
        </div>
        <hr className='Board-line'></hr>
        {Array.isArray(datas) && datas.length === 0 || datas === undefined ? null : datas.map((data, index)=>{
          if(index >= 3){
            return
          }
          return(
            <div className='Board-box' key={index}>
              <div className='Board-box-contain' onClick={()=>enterRoom(data.id)}>
                <div className="Board-left">
                  <AiFillStar style={{margin:"0 5px 0 0",fontSize:"22px",color:"rgb(255, 221, 89)"}}></AiFillStar>
                  <a><h3 className='Board-title'>{data.title}</h3></a>
                </div>
                <div className="Board-right">
                  <span className="Board-date">{data.createTime[0]}. {data.createTime[1]} .{data.createTime[2]}</span>
                  <span className="Board-like-count">{data.like}</span>
                  <AiFillEye style={{margin:"0 4px 0 4px",fontSize:"24px",color:"gray",float:"right"}}></AiFillEye>
                  <span className="Board-view">{data.views}</span>
                </div>
              </div>
              <hr className='Board-line'></hr>
            </div>
          )
        })}
      </div>
      <FiMoreHorizontal style={{fontSize:"24px", margin:"0 auto", display:"flex"}}></FiMoreHorizontal>
    </div>
  )
}

export default Board