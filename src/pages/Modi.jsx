import React from 'react'
import Header from '../components/header/Header'
import NavBar from '../components/navBar/NavBar'
import "../assets/Global.scss"
import CreateBoard from "../components/createBoard/CreateBoard"
import { useParams } from "react-router-dom"

const Modi = () => {
  const {id} = useParams()
  return (
    <div className='default'>
      <Header></Header>
      <div className='default-slice'>
        <div className='이미지1'></div>
        <div className='default-container'>
          <NavBar></NavBar>
          <div className='default-page'>
            <CreateBoard modi={true} id={id}></CreateBoard>
          </div>
        </div>
        <div className='이미지2'></div>
      </div>
    </div>
  )
}

export default Modi