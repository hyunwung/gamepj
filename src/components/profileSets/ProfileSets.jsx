import React, { useEffect } from 'react'
import "./ProfileSets.scss"
import { useState } from 'react'
import img from "../../assets/PAN_ULT.gif"
import img2 from "../../assets/PAN_FLower.gif"
import img3 from "../../assets/PAN_skill2.gif"
import img4 from "../../assets/PAN_ULT2.gif"
import axios from 'axios'
import Swal from "sweetalert2";
import { useNavigate } from 'react-router'

const ProfileSets = () => {
  const imgList = [img, img2, img3, img4]; // 랜덤 이미지 생성
  const randomIndex = Math.floor(Math.random() * imgList.length); 
  const randomImg = imgList[randomIndex];

  const [nickname , setNickName] = useState("")
  const [defaultNick,setDefault] = useState("")
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    localStorage.removeItem('id')
    Swal.fire({title:"로그아웃 되었습니다."})
    navigate("/main")
  }
  const defaultName = async () => {
    try {
      const response = await axios.get("/users/me",
      {
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
        }
      },{ withCredentials: true });
      
      setNickName(response.data.data.userName)
    }catch (error) {
      console.log(error)
    }
  }
  const nameHandle = (e) => {
    setNickName(e.target.value)
  }
  const updateName = async () => {
    if(nickname.length < 2){
      Swal.fire({title:"닉네임은 최소 두글자 입니다."})
      return
    }
    try {
      const response = await axios.patch("/users",{userName:nickname},
      {
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
        }
      },{ withCredentials: true });
      if(response.status){
        Swal.fire({title:"변경에 성공하였습니다."})
        setNickName("")
      }
    }catch (error) {
      console.log(error)
      if(error.response.data.message === "DUPLICATE_NAME"){
        Swal.fire({title:"이미 닉네임이 존재합니다."})
      }
    }
  };
  useEffect(()=>{
    defaultName()
  },[])
  return (
    <div className='profileSets'>
      <div className='profileSets-container'>
          <img src={randomImg} className='profile-logo'></img>
          <div className='profile-modi'>
            <form>    
              <input placeholder='닉네임' type="text" maxLength={8} value={nickname} onChange={nameHandle}></input>
            </form>
            <button className='profile-confirm' onClick={updateName}>변경</button>
          </div>
          <span className='profile-exit' onClick={logout}>로그아웃</span>
        </div>
    </div>
  )
}

export default ProfileSets