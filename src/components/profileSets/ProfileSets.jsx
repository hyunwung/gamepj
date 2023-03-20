import React from 'react'
import "./ProfileSets.scss"
import { useState } from 'react'
import person from "../../assets/person.png"
import axios from 'axios'
import Swal from "sweetalert2";
import { useNavigate } from 'react-router'

const ProfileSets = () => {
  const [nickname , setNickName] = useState("")
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    Swal.fire({title:"로그아웃 !"})
    navigate("/main")
  }
  const nameHandle = (e) => {
    setNickName(e.target.value)
  }
  const updateName = async () => {
    if(nickname.length < 2){
      Swal.fire({title:"닉네임은 최소 두글자 입니다."})
    }
    try {
        const response = await axios.patch("/users",{userName:nickname},
        {
          headers:{
            'Authorization': 'Bearer '+localStorage.getItem("accessToken")
          }
        },{ withCredentials: true });
        console.log(response)
        Swal.fire({title:"변경에 성공하였습니다."})
        setNickName("")
    }catch (error) {
      console.log(error)
    }
  };
  return (
    <div className='profileSets'>
      <div className='profileSets-container'>
          <img src={person} className='profile-logo'></img>
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