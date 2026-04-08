import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Signup() {
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
      setError('Server is offline or CORS is blocking the request.');
      toast.error('Could not connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1440 0%, #0e0a1a 50%, #2a0a2a 100%)',
      padding: '16px'
    }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-btn {
          0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); }
          70% { box-shadow: 0 0 0 12px rgba(139, 92, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
        }
        .auth-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1.5px solid #e5e7eb;
          background: #f3f4f6;
          color: #1f2937;
          font-size: 15px;
          outline: none;
          box-sizing: border-box;
          transition: border 0.2s;
        }
        .auth-input:focus {
          border-color: #8b5cf6;
          background: #fff;
        }
        .auth-btn {
          width: 100%;
          padding: 13px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(90deg, #8b5cf6, #6366f1);
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: transform 0.15s, opacity 0.15s;
          margin-top: 8px;
        }
        .auth-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          opacity: 0.95;
        }
        .auth-btn:active:not(:disabled) {
          transform: scale(0.97);
        }
        .auth-btn:disabled {
          cursor: not-allowed;
          animation: pulse-btn 1.2s infinite;
        }
        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top: 3px solid #fff;
          border-radius: 50%;
          animation: spin 0.75s linear infinite;
          flex-shrink: 0;
        }
        .dots::after {
          content: '';
          animation: dots 1.2s steps(3, end) infinite;
        }
        @keyframes dots {
          0%   { content: '.'; }
          33%  { content: '..'; }
          66%  { content: '...'; }
          100% { content: ''; }
        }
      `}</style>

      <div style={{
        background: '#fff',
        borderRadius: '20px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '420px',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(90deg, #6c2bd7, #4f46e5)',
          padding: '32px 32px 28px',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', margin: 0 }}>Welcome!</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: '6px', fontSize: '14px' }}>Create your account to continue.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '13px',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <input
            className="auth-input"
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={e => setFullname(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span>Signing Up<span className="dots"></span></span>
              </>
            ) : (
              'Sign Up'
            )}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
            <span style={{ color: '#9ca3af', fontSize: '13px' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
          </div>

          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              style={{ color: '#6c2bd7', fontWeight: '600', cursor: 'pointer' }}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}