import React from 'react'
import "./BoardItems.scss"
import { AiFillHome ,AiFillStar ,AiFillEye} from "react-icons/ai";
import like from "../../assets/heart.png"
import {useNavigate} from "react-router-dom"
import { BsFillPencilFill } from "react-icons/bs";
import { useState , useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../assets/Global.scss";

const BoardItems = () => {
  const [datas,setData] = useState([])
  const [pages,setPages] = useState([])
  const [page,setPage] = useState(0)
  const navigate = useNavigate()

  const handlePage = (id) => {
    console.log(id)
    setPage(id)
    
  }
  const getBoardData = async () =>{
    try{
      const repo = await axios.get(`/boards?page=${page}`,{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
      }})
      if (repo.data.data.content[0] !== undefined){
        setData(repo.data.data.content)
        setPages([...Array(repo.data.data.totalPages).keys()])
      }
    }catch(error){
      console.log(error)
      Swal.fire({icon: 'warning', html:"로딩에 실패하였습니다. <br/>로그인을 해주세요."})
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      navigate("/login")
    }
  }
  const enterRoom = (id) => {
    navigate(`/board/detail/${id}`,{state:{id:id}})
  }

  useEffect(()=>{
    getBoardData()
  },[page])
  return (
    <div className='BoardItems'>
      <div className='BoardItems-container con_box5'>
        <div className='BoardItems-title'>
          <div className='BoardItems-title-name'>
            <AiFillHome style={{fontSize:"23px" , margin:"0 5px 4px 8px"}}></AiFillHome>
            <h2 className='BoardItems-span'>공지사항</h2>
          </div>
        </div>
        <hr className='BoardItems-line'></hr>
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
                  <span className="BoardItems-view">{data.view}</span>
                </div>
              </div>
              <hr className='BoardItems-line'></hr>
            </div>
          )
        })}
        <div className='Board-footer con_box20'>
          <div></div>
          <ul>
          {pages.map((page,index)=>{
            return(
              <li onClick={()=>handlePage(index)} key={index}>{page+1}</li>
            )
          })}
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