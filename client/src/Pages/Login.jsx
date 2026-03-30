import React, { useState } from 'react';
import { Code, Sparkles, RefreshCw, Copy, LogOut, Menu, X } from 'lucide-react';

export default function CodeGenieApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [serverLoaded, setServerLoaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [error, setError] = useState('');
  
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    fullname: ''
  });
  
  const [codeData, setCodeData] = useState({
    framework: 'html-css',
    description: '',
    generatedCode: ''
  });

  const loadServer = () => {
    setServerLoaded(false);
    setTimeout(() => {
      setServerLoaded(true);
    }, 2000);
  };

  const handleAuth = async () => {
    setError('');
    
    if (!authForm.email || !authForm.password) {
      setError('Please fill in all fields');
      return;
    }

    if (isSignup && !authForm.fullname) {
      setError('Please enter your full name');
      return;
    }

    try {
      // 100% Hardcoded to bypass Vercel environment variable issues
      const endpoint = isSignup 
        ? `https://codegenie-componentmaker.onrender.com/api/users` 
        : `https://codegenie-componentmaker.onrender.com/api/users/login`;
      
      const body = isSignup 
        ? { fullname: authForm.fullname, email: authForm.email, password: authForm.password }
        : { email: authForm.email, password: authForm.password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userId', data.userId);
        if (!serverLoaded) {
          loadServer();
        }
        setIsAuthenticated(true);
        setShowAuthModal(false);
        setMobileMenuOpen(false);
        setError('');
      } else {
        // This will print exactly what the backend didn't like (e.g., "User already exists")
        setError(`Backend rejected: ${data.message || 'Unknown error'}`);
      }
    } catch (err) {
      // This will print the EXACT network failure reason on your screen
      setError(`CRITICAL NETWORK ERROR: ${err.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setShowAuthModal(true);
  };

  const generateCode = () => {
    if (!codeData.description.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setCodeData(prev => ({ ...prev, generatedCode: "// Code generated successfully!" }));
      setIsGenerating(false);
    }, 2000);
  };

  const AuthModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
          <h2 className="text-3xl font-bold text-center">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>
        </div>
        
        <div className="p-8">
          {/* THE ERROR BOX */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-bold">
              {error}
            </div>
          )}

          {isSignup && (
            <div className="mb-4">
              <input
                type="text"
                value={authForm.fullname}
                onChange={(e) => setAuthForm({...authForm, fullname: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black"
                placeholder="Full Name"
              />
            </div>
          )}
          
          <div className="mb-4">
            <input
              type="email"
              value={authForm.email}
              onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black"
              placeholder="Email Address"
            />
          </div>
          
          <div className="mb-6">
            <input
              type="password"
              value={authForm.password}
              onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black"
              placeholder="Password"
            />
          </div>
          
          <button
            onClick={handleAuth}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold"
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsSignup(!isSignup); setError(''); }}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900">
      {showAuthModal && <AuthModal />}
    </div>
  );
}