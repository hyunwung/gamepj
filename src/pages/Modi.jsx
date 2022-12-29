import React from 'react'
import Header from '../components/header/Header'
import NavBar from '../components/navBar/NavBar'
import "../assets/Global.scss"
import ModiBoard from "../components/modi/ModiBoard"

const Modi = () => {
  return (
    <div className='default'>
      <Header></Header>
      <div className='default-container'>
        <NavBar></NavBar>
        <div className='default-page'>
          <ModiBoard></ModiBoard>
        </div>
      </div>
    </div>
  )
}

export default Modi