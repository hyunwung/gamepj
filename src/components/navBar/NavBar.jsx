import React,{useState} from 'react'
import "./NavBar.scss"

const NavBar = () => {
  const [menuItem,setMenuItem] = useState(0)

  const handleDisplay = (id) => {
    setMenuItem(id)
  }

  const handleUnDisplay = () => {
    setMenuItem(0)
  }

  return (
    <div className='navbar'>
      <nav className='nav-menu'>
        <ul className='nav-menu-items'>
          <li className='navbar-toggle'>
          </li>
          <div className='nav-menu-item' onMouseEnter={()=>handleDisplay(1)} onMouseLeave={handleUnDisplay}>새 소식
            <div className={'nav-menu-in-item'+(menuItem === 1 ? " active" : " none")}>업데이트</div>
            <div className={'nav-menu-in-item'+(menuItem === 1 ? " active" : " none")}>공지사항</div>
          </div>
          <div className='nav-menu-item' onMouseEnter={()=>handleDisplay(2)} onMouseLeave={handleUnDisplay} >커뮤니티
            <div className={'nav-menu-in-item'+(menuItem === 2 ? " active" : " none")}>자유게시판</div>
          </div>
          <div className='nav-menu-item'>게임소개</div>
          <div className='nav-menu-item'>고객센터</div>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar