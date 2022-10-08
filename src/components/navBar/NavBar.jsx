import React,{useState} from 'react'
import "./NavBar.scss"
import { Link } from 'react-router-dom';
import Header from '../header/Header' 
import { AiOutlineClose } from "react-icons/ai";
const NavBar = () => {
  const [menuOpens,setMenuOpens] = useState(true)
  const [menuItem,setMenuItem] = useState(false)
  const handleDisplay = () => {
    setMenuItem((prev)=>!prev)
  }

  const showSidebar = () => setMenuOpens((prev)=>!prev);

  return (
    <div className='navbar'>
      <Header setMenuOpens={setMenuOpens}></Header>
      <nav className={menuOpens ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
          <li className='navbar-toggle'>
          </li>
          <li className='nav-menu-close'>
            <AiOutlineClose onClick={showSidebar}></AiOutlineClose>
          </li>
          <div className='nav-menu-item' onMouseEnter={handleDisplay} onMouseLeave={handleDisplay}>공지사항
            <div className={'nav-menu-in-item'+(menuItem ? " active" : " none")}>응애</div>
            <div className={'nav-menu-in-item'+(menuItem ? " active" : " none")}>응애</div>
            <div className={'nav-menu-in-item'+(menuItem ? " active" : " none")}>응애</div>
          </div>
          <div className='nav-menu-item'>커뮤니티</div>
          <div className='nav-menu-item'>게임소개</div>
          <div className='nav-menu-item'>고객센터</div>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar