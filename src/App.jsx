import React from 'react'
import './App.css'
import {BrowserRouter,Routes,Route}from 'react-router-dom'
import Aiprompt from './Pages/Aiprompt'
import OpeningPage from './Pages/OpeningPage'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<OpeningPage/>}/>
         <Route path='/ai' element={<Aiprompt/>}/>
      </Routes>
    </div>
  )
}

export default App