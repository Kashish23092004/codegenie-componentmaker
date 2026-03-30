import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('https://codegenie-componentmaker.onrender.com/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('userId', data.userId);
        toast.success('Signup successful!');
        navigate('/opening');
      } else {
        setError(data.message || 'Signup failed');
        toast.error(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError('Server is offline or CORS is blocking the request.');
      toast.error('Could not connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1440] via-[#0e0a1a] to-[#2a0a2a] px-2 sm:px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl flex flex-col gap-5 w-full max-w-md border border-gray-200">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#6c2bd7] mb-1 text-center">Welcome!</h2>
        <p className="text-gray-500 text-center mb-2">Create your account to continue.</p>

        {error && <div className="text-red-500 text-sm text-center font-bold bg-red-100 p-2 rounded">{error}</div>}

        <input type="text" placeholder="Full Name" value={fullname} onChange={e => setFullname(e.target.value)} required className="p-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-purple-400" />
        <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required className="p-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-purple-400" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="p-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-purple-400" />

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full py-3 rounded-lg text-lg font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md hover:from-purple-600 hover:to-indigo-700 transition-all disabled:opacity-50"
        >
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>

        <div className="flex items-center my-2">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-2">
          Already have an account? <span className="text-[#6c2bd7] font-semibold cursor-pointer" onClick={() => navigate('/login')}>Login</span>
        </div>
      </form>
    </div>
  );
};

export default Signup;