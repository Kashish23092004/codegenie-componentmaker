import React from 'react'
import './App.css'
import {BrowserRouter,Routes,Route}from 'react-router-dom'
import Aiprompt from './Pages/Aiprompt'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Aiprompt/>}/>
      </Routes>
    </div>
  )
}

export default App