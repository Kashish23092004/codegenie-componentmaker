import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Aiprompt from './Pages/Aiprompt'
import OpeningPage from './Pages/OpeningPage'
import Signup from './Pages/Signup'
import Login from './Pages/Login'

const RequireAuth = ({ children }) => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    return <div className="min-h-screen flex items-center justify-center text-2xl text-white bg-gradient-to-br from-[#1a1440] via-[#0e0a1a] to-[#2a0a2a]">You need to login first</div>;
  }
  return children;
};

const App = () => {
  return (
    <div>
      <Routes>
  <Route path='/' element={<OpeningPage />} />
  <Route path='/opening' element={<OpeningPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/ai' element={
          <RequireAuth>
            <Aiprompt />
          </RequireAuth>
        } />
      </Routes>
    </div>
  )
}

export default App