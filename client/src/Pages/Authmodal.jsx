import React from 'react';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

function AuthModal({
  visible,
  onClose,
  onAuth,
  isSignup,
  setIsSignup,
  error,
  setError,
  authForm,
  setAuthForm,
  loading,
}) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="relative px-2 w-full max-w-md">
        <div
          className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
          style={{ boxShadow: "0 8px 40px rgba(80, 40, 200, 0.24)" }}
        >
          {/* Heading */}
          <div className="bg-gradient-to-r from-[#321767] via-[#20113F] to-[#6C2BD7] flex flex-col items-center"
            style={{ paddingTop: '2.5rem', paddingBottom: '1.2rem' }}>
            <h2 className="text-4xl font-extrabold text-white mb-0 leading-snug text-center">
              {isSignup ? "Welcome!" : "Welcome Back!"}
            </h2>
            <div className="text-purple-100 text-lg font-medium text-center mt-2 mb-1">
              {isSignup ? "Create your account to continue." : "Sign in to continue."}
            </div>
          </div>
          <form
            className="flex flex-col items-stretch bg-white gap-y-6"
            style={{ padding: '2.3rem 2.5rem' }}
            onSubmit={e => { e.preventDefault(); onAuth(); }}
          >
            {error && (
              <div className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded text-center text-sm">{error}</div>
            )}

            {isSignup && (
              <input
                type="text"
                placeholder="Full Name"
                value={authForm.fullname}
                onChange={e => setAuthForm({ ...authForm, fullname: e.target.value })}
                required
                className="p-4 rounded-lg border border-gray-300 bg-gray-100 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                autoComplete="name"
              />
            )}

            <input
              type="email"
              placeholder="Email Address"
              value={authForm.email}
              onChange={e => setAuthForm({ ...authForm, email: e.target.value })}
              required
              className="p-4 rounded-lg border border-gray-300 bg-gray-100 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              autoComplete="email"
            />

            <input
              type="password"
              placeholder="Password"
              value={authForm.password}
              onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
              required
              className="p-4 rounded-lg border border-gray-300 bg-gray-100 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              autoComplete="current-password"
            />

            <button
              type="submit"
              className="py-4 rounded-lg text-lg font-bold bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-lg hover:from-violet-600 hover:to-indigo-700 transition-all"
              disabled={loading}
            >
              {
                loading
                ? (isSignup ? "Signing Up..." : "Signing In...")
                : (isSignup ? "Sign Up" : "Sign In")
              }
            </button>

            <div className="flex items-center">
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="mx-3 text-gray-400 text-base font-semibold">OR</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>

            <div className="flex flex-row gap-8 justify-center">
              <button className="p-2" type="button"><FaGoogle className="text-violet-500 w-6 h-6" /></button>
              <button className="p-2" type="button"><FaFacebook className="text-violet-500 w-6 h-6" /></button>
              <button className="p-2" type="button"><FaGithub className="text-violet-500 w-6 h-6" /></button>
            </div>

            <div className="text-center text-gray-600 text-base pt-2 pb-2">
              {isSignup ? (
                <>
                  Already have an account?{' '}
                  <span
                    className="text-violet-500 font-semibold cursor-pointer underline"
                    onClick={() => { setIsSignup(false); setError(""); }}>
                    Login
                  </span>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <span
                    className="text-violet-500 font-semibold cursor-pointer underline"
                    onClick={() => { setIsSignup(true); setError(""); }}>
                    Register
                  </span>
                </>
              )}
            </div>
          </form>
          <button
            className="absolute top-4 right-6 p-2 text-gray-400 hover:text-gray-800 text-2xl font-bold"
            onClick={onClose}
            aria-label="Close"
            style={{ lineHeight: '1' }}
          >×</button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
