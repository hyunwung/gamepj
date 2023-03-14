import React from 'react'
import "./ProfileSets.scss"
import { useState } from 'react'
import person from "../../assets/person.png"
import axios from 'axios'
import Swal from "sweetalert2";

const ProfileSets = () => {
  const [nickname , setNickName] = useState("")

  const nameHandle = (e) => {
    setNickName(e.target.value)
  }
  const updateName = async () => {
    if(nickname.length < 2){
      Swal.fire({title:"닉네임은 최소 두글자 입니다."})
    }
    const data = JSON.stringify({userName:nickname});
    try {
        const response = await axios.patch("/users",data,
        {
          headers:{
            'Authorization': 'Bearer '+localStorage.getItem("accessToken")
          }
        },{ withCredentials: true });
        console.log(response)
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
          {/* <span className='profile-exit'>회원탈퇴</span> */}
        </div>
    </div>
  )
}

export default ProfileSets