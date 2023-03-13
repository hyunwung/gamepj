import React from 'react'
import "./LoginContainer.scss"
import { useNavigate  } from 'react-router-dom';
import { useEffect } from 'react';

const LoginContainer = () => {
    const navigate = useNavigate()
    const openGoogle = async () => {
        window.location.href = process.env.REACT_APP_GOOGLE_CLIENT_URL2
    };
    useEffect(()=>{
    },[])
    return (
    <div className='login-container'>
        <div className='login-header'>
            <a className='login-link' href='/main'><span className='login-logo'>RSD</span></a>
        </div>
        <div className='login-bottom-container'>
            <span className='login-title'>RSD</span>
            <button type="button" className='social-login-btn' onClick={openGoogle}><span>Google Play로 로그인</span></button>
        </div>
    </div>
  )
}

export default LoginContainer