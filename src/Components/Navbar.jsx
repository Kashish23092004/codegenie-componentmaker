
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Navbar = () => {

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');



  const handleLogout = () => {
    localStorage.removeItem('userId');
     toast.success('logout succesfull');
    navigate('/');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row navbar bg-black-900 border-[1px] border-zinc-700 text-neutral-content justify-between px-2 md:px-6 mb-10 md:mb-52 w-full">
        <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-900 to-pink-600 bg-clip-text text-transparent pl-2 md:pl-8 cursor-pointer mb-2 md:mb-0" onClick={()=>navigate('/')}>CodeGenie</div>

        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 px-2 md:px-4 py-2 w-full md:w-auto">

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
