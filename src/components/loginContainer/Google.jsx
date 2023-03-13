import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

const Google = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [token,setToken] = useState('')
  const navigate = useNavigate();

  const googleLogin = async () => {
    try {
        const response = await axios.get("/users/me",{
          headers:{
            'Authorization': 'Bearer '+searchParams.get("token")
          }
        });
        const user = response.data.body.user.id  
        localStorage.setItem("accessToken", searchParams.get("token"));
        localStorage.setItem("user", user);
        
        if(user.length > 8){
          Swal.fire({title:"닉네임을 2자~6자로 변경해주세요"})
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
