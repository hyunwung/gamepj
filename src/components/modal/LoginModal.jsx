import React from 'react'
import "./LoginModal.scss"

const LoginModal = ({setLogin}) => {
    const handleLogin = () => {
        setLogin((prev)=>!prev)
    }
  return (
    <div className='login-modal'>
        <div className='login-modal-container'>
            <div className='login-modal-content'>logo
                <div>logo2</div>
            </div>
        </div>
        <div className='black-out' onClick={handleLogin}></div>
    </div>
  )
}

export default LoginModal