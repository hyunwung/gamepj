import React from 'react'
import "./BoardItems.scss"
import { AiFillHome ,AiFillStar ,AiFillEye} from "react-icons/ai";
import like from "../../assets/heart.png"
import {useNavigate} from "react-router-dom"
import { BsFillPencilFill } from "react-icons/bs";
import { useState , useEffect} from 'react';
import axios from 'axios';
import "../../assets/Global.scss";

const BoardItems = () => {
  const [datas,setData] = useState([])
  const navigate = useNavigate()
  const getBoardData = async() =>{
    try{

      const repo = await axios.get("/boards",{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
      }})
      console.log(repo)
      if (repo.data.data.content[0] !== undefined){
        setData(repo.data.data.content)
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
    <div className='BoardItems'>
      <div className='BoardItems-container con_box5'>
        <div className='BoardItems-title'>
          <div className='BoardItems-title-name'>
            <AiFillHome style={{fontSize:"23px" , margin:"0 5px 4px 8px"}}></AiFillHome>
            <h2 className='BoardItems-span'>공지사항</h2>
          </div>
          
        </div>
        <hr className='BoardItems-line con_box10'></hr>
        {Array.isArray(datas) && datas.length === 0 || datas === undefined ? null : datas.map((data, index)=>{
          return(
            <div className='BoardItems-box' key={index}>
              <div className='BoardItems-box-contain' onClick={()=>enterRoom(data.id)}>
                <div className="BoardItems-left">
                  <AiFillStar style={{margin:"0 5px 0 0",fontSize:"22px",color:"rgb(255, 221, 89)"}}></AiFillStar>
                  <a><h3 className='BoardItems-title'>{data.title}</h3></a>
                </div>
                <div className="BoardItems-right">
                  <span className="BoardItems-date">{data.createTime[0]}. {data.createTime[1]} .{data.createTime[2]}</span>
                  <img src={like} className="BoardItems-like"></img>
                  <span className="BoardItems-like-count">{data.like}</span>
                  <AiFillEye style={{margin:"0 4px 0 4px",fontSize:"24px",color:"gray",float:"right"}}></AiFillEye>
                  <span className="BoardItems-view">{data.views}</span>
                </div>
              </div>
              <hr className='BoardItems-line'></hr>
            </div>
          )
        })}
        <div className='Board-footer'>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
          <a href='/create' className='create-board'>
            <span>글쓰기</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default BoardItems