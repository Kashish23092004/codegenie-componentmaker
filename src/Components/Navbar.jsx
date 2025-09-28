
import React, { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(current);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'mywhite' ? 'dark' : 'mywhite';
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row navbar bg-black-900 border-[1px] border-zinc-700 text-neutral-content justify-between px-2 md:px-6 mb-10 md:mb-52 w-full">
        <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-900 to-pink-600 bg-clip-text text-transparent pl-2 md:pl-8 cursor-pointer mb-2 md:mb-0" onClick={()=>navigate('/')}>CodeGenie</div>

        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 px-2 md:px-4 py-2 w-full md:w-auto">
          {/* Theme toggle */}
          <button
            className="swap swap-rotate hover:text-slate-400"
            aria-label="Toggle theme"
            onClick={handleThemeToggle}
          >
            {theme === 'mywhite' ? (
              // Moon icon (show when in light mode, click to go dark)
              <svg className="h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            ) : (
              // Sun icon (show when in dark mode, click to go light)
              <svg className="h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            )}
          </button>

          {/* User and Settings Icons */}
          <div className="flex gap-2 md:gap-4 text-2xl md:text-3xl w-full md:w-auto">
            {!userId ? (
              <button
                style={{ padding: "12px 40px", fontSize: '1.1rem' }}
                className="w-full md:w-auto px-4 md:px-6 py-2 rounded-full border-2 border-white bg-gradient-to-r from-blue-800 via-purple-900 to-pink-500 text-white text-base font-semibold shadow-md transition-all duration-200 hover:bg-white hover:text-[#2a0a2a] hover:border-pink-500"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            ) : (
              <button
                style={{ padding: "12px 40px", fontSize: '1.1rem' }}
                className="w-full md:w-auto px-4 md:px-6 py-2 rounded-full border-2 border-white bg-gradient-to-r from-blue-800 via-purple-900 to-pink-500 text-white text-base font-semibold shadow-md transition-all duration-200 hover:bg-white hover:text-[#2a0a2a] hover:border-pink-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
