import React, { useState } from 'react';
import { ShieldCheck, Lock, User, Mail, LogIn, UserPlus } from 'lucide-react';
import './AuthPage.css';

export default function AuthPage({ onLogin, appName }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (isRegisterMode && !fullName)) {
      alert('Please fill out all required fields');
      return;
    }
    onLogin({ fullName: fullName || email.split('@')[0], email });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <Lock size={28} />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#ffffff' }}>{appName}</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            {isRegisterMode ? 'Initialize your secured vault account' : 'Sign in to access your investment portal'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {isRegisterMode && (
            <div className="form-group">
              <label>FULL NAME</label>
              <input
                type="text"
                placeholder="Alexander Vance"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>EMAIL ADDRESS</label>
            <input
              type="email"
              placeholder="user@aethervault.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>VAULT PASSWORD</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {isRegisterMode ? 'Create Vault Account' : 'Unlock Portal'}
          </button>
        </form>

        <div className="toggle-auth">
          <span>{isRegisterMode ? 'Already registered?' : "Don't have an account?"} </span>
          <button
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="toggle-btn"
          >
            {isRegisterMode ? 'Sign In' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
}