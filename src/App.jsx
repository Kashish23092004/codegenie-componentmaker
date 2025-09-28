
import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Aiprompt from './Pages/Aiprompt'
import OpeningPage from './Pages/OpeningPage'
import Signup from './Pages/Signup'
import Login from './Pages/Login'

const RequireAuth = ({ children }) => {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1440] via-[#0e0a1a] to-[#2a0a2a] px-2">
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl flex flex-col gap-5 w-full max-w-md border border-gray-200 items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#6c2bd7] mb-1 text-center">You need to login first</h2>
          <p className="text-gray-500 text-center mb-2">Please login to access this page.</p>
          <button
            className="w-full py-3 rounded-lg text-lg font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md hover:from-purple-600 hover:to-indigo-700 transition-all"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    );
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