import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AuthModal from './Pages/Authmodal';
import OpeningPage from './Pages/OpeningPage';
import Aiprompt from './Pages/Aiprompt';
import './App.css';

const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [authForm, setAuthForm] = useState({ fullname: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsAuthenticated(!!userId);
    if (!userId) {
      setShowAuthModal(true);
      setIsSignup(false);
    }
  }, []);

  const handleAuth = async () => {
    setLoading(true);
    setError('');
    try {
      const endpoint = isSignup ? 'https://codegenie-componentmaker-backend.onrender.com/signup'
  : 'https://codegenie-componentmaker-backend.onrender.com/signup/login';

      const body = isSignup
        ? { fullname: authForm.fullname, email: authForm.email, password: authForm.password }
        : { email: authForm.email, password: authForm.password };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('userId', data.userId);
        setIsAuthenticated(true);
        setShowAuthModal(false);
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar 
        userId={isAuthenticated ? localStorage.getItem('userId') : null} 
        setUserId={(val) => setIsAuthenticated(!!val)} 
        onShowAuthModal={() => { setIsSignup(false); setShowAuthModal(true); }} 
      />

      <AuthModal
        visible={showAuthModal}
        onClose={() => {}} // Disable manual close
        onAuth={handleAuth}
        isSignup={isSignup}
        setIsSignup={setIsSignup}
        error={error}
        setError={setError}
        authForm={authForm}
        setAuthForm={setAuthForm}
        loading={loading}
        disableClose
      />

      <Routes>
         <Route path="/" element={<OpeningPage />} />
        <Route path="/ai" element={isAuthenticated ? <Aiprompt /> : null} />
      </Routes>
    </>
  );
};

export default App;
