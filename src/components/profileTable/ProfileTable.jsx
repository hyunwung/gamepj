import React from 'react'
import "./ProfileTable.scss"
import { useEffect,useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";

const ProfileTable = () => {
  const [title,setTitle] = useState(0)
  const [data,setData] = useState("")
  const [ex,setEx] = useState("d")
  const navigate = useNavigate();

  const getLikeData = async () =>{
    try{
      const repo = await axios.get(`/boards/likes`,{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
        }
      })
      console.log("좋아요 목록 : ",repo.data.data.content)
      setData(repo.data.data.content)
    }catch(error){
      console.log(error)
      if(localStorage.getItem("accessToken") === null){
        navigate('/login')
        Swal.fire({icon: 'warning', html:"로그인을 해주세요."})
      }
      else{
        console.log(error)
        Swal.fire({icon: 'warning', html:"로딩에 실패하였습니다. <br/>로그인을 해주세요."})
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        localStorage.removeItem('id')
        navigate("/login")
      }
    }
  }

  const moveBoard = (id) => {
    navigate(`/board/detail/${id}`,{state:{id:id}})
  }
  const handleTitle = (id) => {
    setTitle(id)
  }
  useEffect(()=>{
    getLikeData()
  },[])
  return (
    <div className='profileTable'>
      <div className='profileTable-container'>  
        <div className='profile-items'>
          {/* <span className='profile-item' onClick={()=>handleTitle(0)}>작성글</span>
          <span className='profile-item' onClick={()=>handleTitle(1)}>작성댓글</span> */}
          <span className='profile-item'>좋아요한 글</span>
        </div>
        <table className='profile-table'>
          <thead>
            {title === 0 ? 
            <tr>
              <th style={{width:"65%"}} scope='col'>제목</th>
              <th scope='col'>작성일</th>
              <th style={{width:"20%"}} scope='col'>조회수</th>
            </tr> : null}
            {title === 1 ? 
            <tr>
              <th>댓글</th>
            </tr> : null}
            {title === 2 ? 
            <tr>
              <th style={{width:"60%"}}>제목</th>
              <th>작성일</th>
              <th>작성자</th>
              <th>조회</th>
            </tr> : null}
          </thead>
          <tbody>
            {data !== "" && title === 0 ?
              data.map((datas,index)=>{
                return(
                <tr key={index} onClick={()=>moveBoard(datas.id)} className='profile-move'>
                  <td style={{textAlign:"start"}}>
                    {/* <input type="checkbox" className='profile-checkbox'></input> */}
                    <span>{datas.title}</span>
                  </td>
                  <td>
                    <span>{datas.createTime[0]}. {datas.createTime[1]}. {datas.createTime[2]}</span>
                  </td>
                  <td>
                    <span>{datas.views}</span>
                  </td>
                </tr>
                )
              })
            : 
            <tr>
              <td className='profil e-comment-null' colSpan="3">작성하신 글이 없습니다.</td>
            </tr>}
          </tbody>
        </table>
       </div>
    </div>
  )
}

export default ProfileTable