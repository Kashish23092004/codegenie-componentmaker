import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

const OpeningPage = () => {
  const [showvideo, setshowvideo] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#1a1440] via-[#0e0a1a] to-[#2a0a2a] relative overflow-hidden">
      <div className="flex-1 flex flex-col justify-center items-center px-2 sm:px-4 md:px-10 lg:px-36 py-4 md:py-8">
        <div
          className="w-full max-w-7xl shadow-2xl p-2 sm:p-4 md:p-10 lg:p-14 flex flex-col md:flex-row items-center relative"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          {/* Left: Text */}
          <div className="flex-1 flex flex-col gap-4 sm:gap-6 md:gap-8 items-start justify-center z-10 pt-4 sm:pt-8 md:pt-12 lg:pt-16 w-full">
            <p className="text-lg text-[#b6a6e6] uppercase tracking-widest">INTRODUCING</p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-xl">
              Generate Code Components
            </h1>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-800 via-purple-900 to-pink-500 bg-clip-text text-transparent leading-tight drop-shadow-xl">
              Instantly with AI
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#b6a6e6] max-w-lg">
              Describe what you want, select your language, and get production-ready components in seconds. Copy, paste,
              and share with your team.
            </p>

            <button
              onClick={() => {
                window.location.href = '/ai';
              }}
              style={{ padding: "12px 40px" }}
              className="mt-4 px-6 sm:px-10 py-2 sm:py-3 border-2 border-white text-white rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-[#2a0a2a] transition-all shadow-md"
            >
              Get Started
            </button>
          </div>
          {/* Right: Robot and Effect Conversation */}
          <div className="flex-1 flex flex-col items-center justify-center relative mt-8 md:mt-0 w-full">
            <img
              src="/images/robot.png"
              alt="Robot"
              className="w-[220px] sm:w-[300px] md:w-[420px] lg:w-[500px] object-contain drop-shadow-2xl"
              style={{ filter: 'brightness(1.2)' }}
            />
            <div className="absolute top-4 right-0 md:static md:mt-8 flex flex-col items-start md:items-end w-full md:w-auto z-20">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-lg sm:text-xl md:text-2xl text-[#e0d6f7] font-medium">Watch demo</span>
                <span className="ml-1 sm:ml-2 text-lg sm:text-2xl">→</span>
              </div>
              {!showvideo && (
                <button
                  onClick={() => setshowvideo(true)}
                  className="mt-2 sm:mt-4 flex items-center gap-1 sm:gap-2 text-[#e0d6f7] hover:text-white text-sm sm:text-base"
                >
                  <span className="border border-[#e0d6f7] rounded-full p-1 sm:p-2 flex items-center justify-center">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10,8 16,12 10,16" fill="#e0d6f7" />
                    </svg>
                  </span>
                  Play Video
                </button>
              )}
              {showvideo && (
                <video width="320" height="180" className="rounded-lg mt-2" controls autoPlay>
                  <source src="/videos/demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningPage;
