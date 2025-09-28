
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
  const res = await fetch('http://localhost:3000/signup/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('userId', data.userId);
        toast.success('login succesfull')
        navigate('/opening');
      } else {
        setError(data.message || 'Login failed');
        toast.error(data.message);
      }
    } catch (err) {
      setError('Server error');
      toast.error(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1440] via-[#0e0a1a] to-[#2a0a2a] px-2 sm:px-4">
      <form onSubmit={handleSubmit} className="bg-[#18122B] p-4 sm:p-8 md:p-10 rounded-xl shadow-xl flex flex-col gap-4 w-full max-w-md border border-[#3a2b5e] items-center">
        <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
        {error && <div className="text-red-400 text-sm w-full text-center">{error}</div>}
  <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="p-2 sm:p-3 rounded bg-[#232042] text-white w-full text-sm sm:text-base" />
  <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="p-2 sm:p-3 rounded bg-[#232042] text-white w-full text-sm sm:text-base" />
  <button type="submit" className="mt-2 px-4 sm:px-8 py-2 sm:py-3 border-2 border-white text-white rounded-full text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-800 via-purple-900 to-pink-500 hover:bg-white hover:text-[#2a0a2a] transition-all shadow-md w-full">Login</button>
  <div className="text-white text-xs sm:text-sm mt-2">New user? <span className="text-pink-400 cursor-pointer" onClick={()=>navigate('/signup')}>Sign Up here</span></div>
      </form>
    </div>
  );
};

export default Login;