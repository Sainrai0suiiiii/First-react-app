// src/registration/RegisterPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Css/signup.css';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log('Form submitted:', form);
  };

  return (
    <div className="signup-bg">
      <div className="signup-container">
        <div className="signup-header">
          <h2>SIGN-UP</h2>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ textAlign: 'left' }}>
            <label htmlFor="name" style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: '100%', marginTop: '0.3rem', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label htmlFor="mobile" style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="Enter Your Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              required
              style={{ width: '100%', marginTop: '0.3rem', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label htmlFor="email" style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Please Enter Your Email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ width: '100%', marginTop: '0.3rem', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label htmlFor="password" style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Please Enter Your Password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ width: '100%', marginTop: '0.3rem', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
            />
          </div>
          <button type="submit" style={{ background: '#ff9800', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.8rem', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '0.5rem', cursor: 'pointer' }}>
            Sign-up
          </button>
        </form>
        <div style={{ marginTop: '1.2rem', fontSize: '0.95rem', color: '#888' }}>
          If you already have an account?{' '}
          <Link to="/login" style={{ color: '#ff9800', textDecoration: 'none', fontWeight: 'bold' }}>Login Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;