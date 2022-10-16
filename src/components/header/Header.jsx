import React, { useState } from "react"
import "./Header.scss"
import LoginModal from "../modal/LoginModal"
// import {AiOutlineSearch} from "react-icons/ai";
import search from "../../assets/search.png"

const Header = () => {
  const [login,setLogin] = useState(false)
  const [keyword,setKeyWord] = useState("")
  const handleLogin = () => {
    setLogin((prev)=>!prev)
  }
  const handleSearch = () => {

  }
  const searchKeyWord = () => {

  }
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-left">
          <span>게임 로고</span>
        </div>
        <div className="header-center">
          <form>
            <input
              type="search"
              className="header-search"
              maxLength="28"
              autoComplete="off"
              placeholder="검색"
              value={keyword}
              onChange={handleSearch}>  
            </input>
            
          </form>
          <a href="/main" onClick={searchKeyWord} className="search-link">
            <img src={search} className="search-btn"></img>
          </a>
        </div>
        <div className="header-right">
          <div className="login-link" onClick={handleLogin}>Login</div>
          {login ? <LoginModal setLogin={setLogin}></LoginModal> : null} 
        </div>
      </div>
    </div>
  )
}

export default Header