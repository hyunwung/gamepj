import React from 'react'
import ViewHeader from '../components/viewHeader/ViewHeader'
import Header from '../components/header/Header'
import NavBar from '../components/navBar/NavBar'

const ViewBoard = () => {
  return (
    <div className='default'>
      <Header></Header>
      <div className='default-container'>
        <NavBar></NavBar>
        <div className='default-page'>
          <ViewHeader></ViewHeader>
        </div>
      </div>
    </div>
  )
}

export default ViewBoard