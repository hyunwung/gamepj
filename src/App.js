import React from 'react'
import { Route,Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage></MainPage>}></Route>
      </Routes>
    </div>
  )
}

export default App