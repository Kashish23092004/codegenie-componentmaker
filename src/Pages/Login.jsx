import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [generate, setGenerate] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setGenerate(true);
    try {
      const res = await fetch('http://localhost:3000/signup/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('userId', data.userId);
        toast.success('Login successful');
        navigate('/opening');
      } else {
        setError(data.message || 'Login failed');
        toast.error(data.message);
      }
    } catch (err) {
      setError('Server error');
      toast.error('Server error');
    }
    setGenerate(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#171434] via-[#21193d] to-[#2a0a2a]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#232042] border border-[#433a5e] rounded-2xl shadow-2xl px-6 sm:px-12 py-10 flex flex-col gap-6 w-full max-w-lg mx-2"
        style={{ backdropFilter: 'blur(0.5px)' }}
      >
        <h2 className="text-4xl font-extrabold text-white mb-4 text-center tracking-wide drop-shadow">Welcome Back!</h2>
        <p className="text-gray-300 text-center mb-2 text-base">Login to your account to continue.</p>
        {error && (
          <div className="text-red-400 text-center font-medium text-xs px-3 py-2 rounded mb-1 bg-red-900 bg-opacity-20">
            {error}
          </div>
        )}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full rounded-lg bg-[#282545] text-gray-100 placeholder-gray-400 px-4 py-3 sm:py-4 text-base tracking-wide focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full rounded-lg bg-[#282545] text-gray-100 placeholder-gray-400 px-4 py-3 sm:py-4 text-base tracking-wide focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
        />
        <div className="text-right mt-0">
          <span
            className="text-purple-300 text-xs font-medium hover:underline cursor-pointer"
            onClick={() => toast.info('Forgot Password logic here')}
          >
            Forgot Password?
          </span>
        </div>
        <button
          type="submit"
          className="mt-1 block w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-bold rounded-full py-2 sm:py-3 px-3 text-lg tracking-wide shadow-md hover:opacity-90 transition-all"
          disabled={generate}
        >
          {generate ? <span className="loading loading-dots loading-md"></span> : "Login"}
        </button>
      
        <p className="text-gray-100 text-xs sm:text-sm text-center mt-1">
          Don't have an account?{' '}
          <span
            className="text-pink-400 font-semibold hover:text-pink-200 cursor-pointer transition"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
