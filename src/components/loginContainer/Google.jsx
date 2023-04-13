import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import {useCookies} from "react-cookie"
import Swal from "sweetalert2";

const Google = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cookies, setCookie] = useCookies(['refresh_token']); // 쿠키 훅 
  const settingCookie = () => {
    console.log(cookies)
    //setCookie('name', newName, { path: '/' });
  }
  const [token,setToken] = useState('')
  const navigate = useNavigate();

  const googleLogin = async () => {
    try{
        console.log(searchParams.get("token"))
        const response = await axios.get("/users/me",{
          headers:{
            'Authorization': 'Bearer '+searchParams.get("token")
          }
        });
        console.log(response)
        const user = response.data.data.userName  
        localStorage.setItem("accessToken", searchParams.get("token"));
        localStorage.setItem("user", user);
        
        if(user.length > 8){
          Swal.fire({html:"닉네임을 2자~8자로 변경해주세요"})
          navigate("/profile")
        }else{
          navigate("/main");
        }

    }catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    googleLogin()
  }, []);

    return (
        <div>
          잠시만 기다려주세요 🤗
        </div>
    );
}

export default Google;
