import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
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
      const res = await fetch('https://codegenie-componentmaker.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('userId', data.userId);
        toast.success('Login successful!');
        navigate('/opening');
      } else {
        setError(data.message || 'Login failed');
        toast.error(data.message || 'Login failed');
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
        <h2 className="text-3xl sm:text-4xl font-bold text-[#6c2bd7] mb-1 text-center">Welcome Back!</h2>
        <p className="text-gray-500 text-center mb-2">Sign in to your account to continue.</p>

        {error && (
          <div className="text-red-500 text-sm text-center font-bold bg-red-100 p-2 rounded">{error}</div>
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="p-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="p-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full py-3 rounded-lg text-lg font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md hover:from-purple-600 hover:to-indigo-700 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Logging In...
            </>
          ) : (
            'Login'
          )}
        </button>

        <div className="flex items-center my-2">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-2">
          Don't have an account?{' '}
          <span
            className="text-[#6c2bd7] font-semibold cursor-pointer"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;