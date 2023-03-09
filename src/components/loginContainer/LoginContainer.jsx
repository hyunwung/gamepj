import React from 'react'
import "./LoginContainer.scss"
import { useNavigate ,useSearchParams} from 'react-router-dom';
import { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin , GoogleLogout} from '@react-oauth/google';

const LoginContainer = () => {
    const navigate = useNavigate()
    const onSuccess = (response) => {
        console.log(response);
        // const params = new URLSearchParams();
        // console.log(params.append("idToken", response.tokenObj.id_token))
        //localStorage.setItem("accessToken",response.tokenObj.id_token);
    }
    const onError = (error) => {
        console.log(error);
    }
    const openGoogle = () => {
        window.location.href = process.env.REACT_APP_GOOGLE_CLIENT_URL
        //navigate("/oauth/redirect")
        // window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=${process.env.REACT_APP_GOOGLE_SCOPE}`
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