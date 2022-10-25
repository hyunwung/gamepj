import React from 'react'
import "./LoginModal.scss"

const LoginModal = ({setLogin}) => {
    const handleLogin = () => {
        setLogin((prev)=>!prev)
    }
    return (
    <div className='login-modal'>
        <div className='login-modal-container'>
            <div className='login-modal-content'>
                <h2>소셜 로그인</h2>
                <form>
                </form>
            </div>
        </div>
        <div className='black-out' onClick={handleLogin}></div>
    </div>
  )
}

export default LoginModal