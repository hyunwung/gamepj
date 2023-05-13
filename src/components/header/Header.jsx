import React, { useState } from "react"
import "./Header.scss"
import search from "../../assets/search.png"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const [login,setLogin] = useState(false)
  const [keyword,setKeyWord] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {
    setLogin((prev)=>!prev)
  }
  const handleSearch = (e) => {
    setKeyWord(e.target.value)
  }
  const searchKeyWord = () => {
    // navigate(`/search/${keyword}`,{state:{keyword:keyword}})
    window.location.replace(`/search/${keyword}`);
  }
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-left">
          <a href="/main" className="header-logo"><span>게임 로고</span></a>
        </div>
        <div className="header-center">
          <form>
            <input
              type="search"
              className="header-search"
              maxLength="14"
              placeholder="검색"
              value={keyword}
              onChange={handleSearch}>  
            </input>
          </form>
          <div onClick={searchKeyWord} className="search-link">
            <img src={search} className="search-btn"></img>
          </div>
        </div>
        <div className="header-right">
          {localStorage.getItem("accessToken") ? <a className="login-link" href="/profile">Profile</a> : <a className="login-link" href="/login">Login</a>}
        </div>
      </div>
    </div>
  )
}

export default Header