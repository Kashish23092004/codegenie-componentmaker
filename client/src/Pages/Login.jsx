import React, { useState } from 'react';
import { Mail, Code, Sparkles, RefreshCw, Copy, Check, LogOut, Menu, X } from 'lucide-react';

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

  const frameworks = [
    { value: 'html-css', label: 'HTML + CSS' },
    { value: 'html-tailwind', label: 'HTML + Tailwind' },
    { value: 'html-css-js', label: 'HTML + CSS + JS' },
    { value: 'react-tailwind', label: 'React + Tailwind' },
    { value: 'react-css', label: 'React + CSS' }
  ];

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
     const endpoint = isSignup ? `${import.meta.env.VITE_BACKEND_URL}/signup` : `${import.meta.env.VITE_BACKEND_URL}/signup/login`;
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
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setShowAuthModal(true);
    setCodeData({
      framework: 'html-css',
      description: '',
      generatedCode: ''
    });
  };

  const generateCode = () => {
    if (!codeData.description.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      const sampleCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${codeData.description}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 500px;
            width: 100%;
        }
        h1 {
            color: #667eea;
            margin-bottom: 20px;
            text-align: center;
        }
        p {
            color: #555;
            line-height: 1.6;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Generated Component</h1>
        <p>${codeData.description}</p>
    </div>
</body>
</html>`;
      
      setCodeData(prev => ({ ...prev, generatedCode: sampleCode }));
      setIsGenerating(false);
    }, 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(codeData.generatedCode);
  };

  const AuthModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <Code className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-center text-blue-100 mt-2">
            {isSignup ? 'Start generating code with AI' : 'Sign in to continue'}
          </p>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {isSignup && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={authForm.fullname}
                onChange={(e) => setAuthForm({...authForm, fullname: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={authForm.email}
              onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="you@example.com"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={authForm.password}
              onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="••••••••"
            />
          </div>
          
          <button
            onClick={handleAuth}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition duration-200"
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setError('');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ServerLoading = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center z-40">
      <div className="text-center">
        <div className="relative">
          <RefreshCw className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
          <Sparkles className="w-8 h-8 text-purple-600 absolute top-0 right-0 animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mt-6">Initializing AI Server</h3>
        <p className="text-gray-600 mt-2">Please wait while we prepare your workspace...</p>
      </div>
    </div>
  );

  if (!serverLoaded && isAuthenticated) {
    return <ServerLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {showAuthModal && <AuthModal />}
      
      <header className="bg-black bg-opacity-50 backdrop-blur-md border-b border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Code className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CodeGenie
              </h1>
            </div>
            
            {isAuthenticated && (
              <>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 text-gray-300 hover:text-white"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                
                <button
                  onClick={handleLogout}
                  className="hidden lg:flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>
          
          {mobileMenuOpen && isAuthenticated && (
            <div className="lg:hidden pb-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {!isAuthenticated ? (
          <div className="text-center py-12 sm:py-20">
            <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 text-purple-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Generate Code Components
            </h2>
            <p className="text-lg sm:text-xl text-purple-200 mb-8 max-w-2xl mx-auto px-4">
              Instantly with AI - Describe what you want and get production-ready code in seconds
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition duration-200"
            >
              Get Started
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                Component Details
              </h2>
              
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-gray-300 font-semibold mb-2 text-sm sm:text-base">
                    Framework
                  </label>
                  <select
                    value={codeData.framework}
                    onChange={(e) => setCodeData({...codeData, framework: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-sm sm:text-base"
                  >
                    {frameworks.map(fw => (
                      <option key={fw.value} value={fw.value}>{fw.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 font-semibold mb-2 text-sm sm:text-base">
                    Description
                  </label>
                  <textarea
                    value={codeData.description}
                    onChange={(e) => setCodeData({...codeData, description: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition h-64 resize-none text-sm sm:text-base"
                    placeholder="Describe what you want to build... e.g., 'A modern login form with gradient background'"
                  />
                </div>
                
                <button
                  onClick={generateCode}
                  disabled={isGenerating || !codeData.description}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Code
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                  <Code className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                  Generated Code
                </h2>
                {codeData.generatedCode && (
                  <button
                    onClick={copyCode}
                    className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              {codeData.generatedCode ? (
                <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 h-[500px] overflow-auto">
                  <pre className="text-green-400 text-xs sm:text-sm font-mono whitespace-pre-wrap">
                    {codeData.generatedCode}
                  </pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[500px] text-gray-500">
                  <Code className="w-16 h-16 sm:w-20 sm:h-20 mb-4 opacity-50" />
                  <p className="text-base sm:text-lg text-center px-4">
                    Fill in the details and click "Generate Code" to see your AI-crafted component
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}