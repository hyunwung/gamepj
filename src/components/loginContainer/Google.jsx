import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const Google = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [token,setToken] = useState('')
  const location = useLocation();
  
  const navigate = useNavigate();
  

  const googleLogin = async () => {
    try {
        setToken()
        const response = await axios.get("/users/me",{headers:{
          Authorization: `Bearer ${location.hash.split('=')[1].split('&')[0]}`
          }
        });
        console.log(response)
        const accessToken = response.headers.authorization;
        const refreshToken = response.headers.refreshtoken;
        const eMail = response.data.data.email;
        const nickName = response.data.data.nickname;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshtoken", refreshToken);
        localStorage.setItem("email", eMail);
        localStorage.setItem("nickname", nickName);
        // localStorage.setItem("userImgUrl", response.payload);
        // if(nickName.length > 10){
        //   Swal.fire({title:"닉네임을 2자~6자로 변경해주세요",confirmButtonColor:"#FFD68B"})
        //   navigate("/m")
        // }else{
        //   navigate("/main");
        // }
    }catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    //const access_token = searchParams.get("access_token")
    console.log(location.hash.split('=')[1].split('&')[0])
    
    googleLogin()
  }, []);

    return (
        <div>
          잠시만 기다려주세요 🤗
        </div>
    );
}

export default Google;
