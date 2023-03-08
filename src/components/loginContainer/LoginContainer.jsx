import React from 'react'
import "./LoginContainer.scss"

const LoginModal = () => {
    const openGoogle = () => {
        // 토큰 불러오고
        window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=${process.env.REACT_APP_GOOGLE_SCOPE}`
    };
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

export default LoginModal