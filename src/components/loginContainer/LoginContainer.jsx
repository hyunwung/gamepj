import React from 'react'
import "./LoginContainer.scss"

const LoginModal = () => {
    const openGoogle = () => {
        window.location.href = process.env.REACT_APP_GOOGLE_CLIENT_ID
        // 토큰 불러오고
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