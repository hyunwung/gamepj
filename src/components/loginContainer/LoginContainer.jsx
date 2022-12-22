import React from 'react'
import "./LoginContainer.scss"

const LoginModal = () => {
    return (
    <div className='login-container'>
        <div className='login-header'>
            <span className='login-logo'>RSD</span>
        </div>
        <div className='login-bottom-container'>
            <span className='login-title'>RSD</span>        
            <button className='social-login-btn'><span>Google Play로 로그인</span></button>
            <button className='social-login-btn'><span>KAKAO로 로그인</span></button>
        </div>
    </div>
  )
}

export default LoginModal