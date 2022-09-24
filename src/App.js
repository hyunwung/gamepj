import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Main from './pages/Main'
import Intro from "./pages/Intro"
import "./App.css"
import Notice from './pages/Notice'
import WriteNotice from "./pages/WriteNotice"

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Intro></Intro>}></Route>
        <Route path='/main' element={<Main></Main>}></Route>
        <Route path='/notice' element={<Notice></Notice>}></Route>
        <Route path='/write/notice' element={<WriteNotice></WriteNotice>}></Route>
      </Routes>
    </div>
  )
}

export default App