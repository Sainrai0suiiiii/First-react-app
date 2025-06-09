import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/login.css';

const Login = () => {
  return (
    <div className="login-background">
      <div className="login-card">
        <div className="login-icon">
          {/* Shopping cart SVG */}
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 20H45L40 40H20L15 20Z" stroke="#fff" strokeWidth="2.5" fill="none"/>
            <circle cx="25" cy="45" r="2.5" fill="#fff"/>
            <circle cx="35" cy="45" r="2.5" fill="#fff"/>
            <path d="M30 15V25" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M27 18L30 15L33 18" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        <form className="login-form">
          <div className="input-group">
            <span className="input-icon">
              {/* User icon */}
              <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 8-4 8-4s8 0 8 4"/></svg>
            </span>
            <input type="text" placeholder="Username" required />
          </div>
          <div className="input-group">
            <span className="input-icon">
              {/* Lock icon */}
              <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="8" rx="2"/><path d="M12 15v2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </span>
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit" className="login-btn">LOGIN</button>
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          <div className="create-account">
            <Link to="/signup">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
