import React from 'react'
import Header from '../components/header/Header'
import NavBar from '../components/navBar/NavBar'
import CreateBoard from '../components/createBoard/CreateBoard'
import "../assets/Global.scss"

const Create = () => {
  return (
    <div className='default'>
      <Header></Header>
      <div className='default-container'>
        <NavBar></NavBar>
        <div className='default-page'>
          <CreateBoard></CreateBoard>
        </div>
      </div>
    </div>
  )
}

export default Create