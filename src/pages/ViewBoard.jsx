import React from 'react'
import ViewHeader from '../components/viewHeader/ViewHeader'
import Header from '../components/header/Header'
import NavBar from '../components/navBar/NavBar'
import Comment from '../components/comment/Comment'

const ViewBoard = () => {
  return (
    <div className='default'>
      <Header></Header>
      <div className='default-container'>
        <NavBar></NavBar>
        <div className='default-page'>
          <ViewHeader></ViewHeader>
          
          <Comment></Comment>
        </div>
      </div>
    </div>
  )
}

export default ViewBoard