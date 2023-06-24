import React from 'react'
import "./BoardItems.scss"
import { AiFillHome ,AiFillStar ,AiFillEye} from "react-icons/ai";
import {useNavigate , useParams} from "react-router-dom"
import prev from "../../assets/prev.png"
import next from "../../assets/next.png"
import { useState , useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../assets/Global.scss";

const BoardItems = () => {
  const [datas,setData] = useState([]) // 게시글들
  const [pages,setPages] = useState([]) // 총 페이지 수 
  const [page,setPage] = useState(0) // 해당 몇 페이지
  const [pagination,setPagination] = useState(0) // 페이지 그룹
  const [maxPage,setMaxPage] = useState(10) // 최소 페이지
  const [minPage,setMinPage] = useState(0) // 최대 페이지
  const [prevActive,setPrevActive] = useState(false)
  const [nextActive,setNextActive] = useState(false)

  const navigate = useNavigate()
  const param = useParams();

  const options = {
    1:'NOTICE',
    2:'EVENT',
    3:'UPDATE',
    4:'DEVELOPER_NOTES',
    5:'BUG',
    6:'GUIDE',
    7:'FAQ'
  }
  const paginationPrev = () => {
    if(0 === Number(String(minPage).slice(0,-1))){      
      return
    }else{
      setMaxPage(maxPage-10)
      setMinPage(minPage-10)
      setPage(minPage-10)
    }
  }
  const paginationNext = () => {
    if(pagination === Number(String(maxPage).slice(0,-1))){
      return
    }else{
      setMaxPage(maxPage+10)
      setMinPage(minPage+10)
      setPage(maxPage)
    }
  }
  const handlePage = (id) => {
    setPage(id)
  }
  const getBoardData = async () =>{
    try{
      const repo = await axios.get(`/boards?page=${page}&type=${options[param.id]}`,{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
      }})
      console.log(repo)
      if (repo.data.data.content[0] !== undefined){
        setData(repo.data.data.content)
        setPages([...Array(repo.data.data.totalPages).keys()])
        setPagination(Math.ceil(repo.data.data.totalPages/10))
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
    if(pagination === Number(String(maxPage).slice(0,-1))){
      setNextActive(true)
    }else{
      setNextActive(false)
    }
    if(0 === Number(String(minPage).slice(0,-1))){
      setPrevActive(true)
    }else{
      setPrevActive(false)
    }
  },[maxPage])

  useEffect(()=>{
    getBoardData()
  },[page])
  
  return (
    <div className='BoardItems'>
      <div className='BoardItems-container con_box5'>
        <div className='BoardItems-title'>
          <div className='BoardItems-title-name'>
            <h2 className='BoardItems-span'>{options[param.id]}</h2>
          </div>
        </div>
        <hr className='BoardItems-line'></hr>
        {Array.isArray(datas) && datas.length === 0 || datas === undefined ? null : datas.map((data, index)=>{
          return(
            <div className='BoardItems-box' key={index}>
              <div className='BoardItems-box-contain' onClick={()=>enterRoom(data.id)}>
                <div className="BoardItems-left">
                  {/* <AiFillStar style={{margin:"0 5px 0 0",fontSize:"22px",color:"rgb(255, 221, 89)"}}></AiFillStar> */}
                  <a><h3 className='BoardItems-title'>{data.title}</h3></a>
                </div>
                <div className="BoardItems-right">
                  <span className="BoardItems-date">{data.createTime[0]}. {data.createTime[1]} .{data.createTime[2]}</span>
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
            <button className='dir-btn' onClick={paginationPrev} style={{display:prevActive ? "none" : "block"}}><img src={prev}></img></button>
            {pages.map((pagenum,index)=>{
              if(index >= maxPage || index < minPage){
                return
              }
              return(
                <li className={index === page ? "active" : null} onClick={()=>handlePage(index)} key={index}>{pagenum+1}</li>
              )
            })}
            <button className='dir-btn' onClick={paginationNext} style={{display: pages.length <= 10 || nextActive ? "none" : "block"}}><img src={next}></img></button>
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