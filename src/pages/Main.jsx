import React from 'react'
import NavBar from '../components/navBar/NavBar'
import "../assets/Global.scss"
import Board from '../components/board/Board'
import Header from '../components/header/Header'
import Notice from '../components/notice/Notice'
import Update from '../components/update/Update'

const Main = () => {
  return (
    <div className='main-page'>
      <Header></Header>
      <div className='main-page-container'>
        <NavBar></NavBar>
        <div className='page-view'>
          <Board></Board>
          <Notice></Notice>
          <Update></Update>
        </div>
      </div>
    </div>
  )
}

export default Main