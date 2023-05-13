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
            <a href='/boards/1' className='nav-anchor'><div className={'nav-menu-in-item'+(menuItem === 1 ? " active" : " none")}>공지사항</div></a>
            <a href='/boards/2' className='nav-anchor'><div className={'nav-menu-in-item'+(menuItem === 1 ? " active" : " none")}>이벤트</div></a>
            <a href='/boards/3' className='nav-anchor'><div className={'nav-menu-in-item'+(menuItem === 1 ? " active" : " none")}>업데이트</div></a>
          </div>
          <div className='nav-menu-item' onMouseEnter={()=>handleDisplay(2)} onMouseLeave={handleUnDisplay}>게임소개
            <a href='/boards/4' className='nav-anchor'><div className={'nav-menu-in-item'+(menuItem === 2 ? " active" : " none")}>개발자 노트</div></a>
          </div>
          <div className='nav-menu-item' onMouseEnter={()=>handleDisplay(3)} onMouseLeave={handleUnDisplay}>고객센터
            <a href='/boards/5' className='nav-anchor'><div className={'nav-menu-in-item'+(menuItem === 3 ? " active" : " none")}>버그</div></a>
            <a href='/boards/6' className='nav-anchor'><div className={'nav-menu-in-item'+(menuItem === 3 ? " active" : " none")}>가이드</div></a>
            <a href='/boards/7' className='nav-anchor'><div className={'nav-menu-in-item'+(menuItem === 3 ? " active" : " none")}>FAQ</div></a>
          </div>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar