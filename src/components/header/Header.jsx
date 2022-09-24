import React from 'react'
import "./Header.scss"
import logo from "../../assets/example.jpg"

const Header = () => {
  return (
    <div className='header'>
      <div className='header-container'>
        <div className='header-left'>
            <img src={logo} alt="" className='main-logo'></img>
        </div>
        <div className='header-right'>
            <button>로그인</button>
        </div>
      </div>
    </div>
  )
}

export default Header