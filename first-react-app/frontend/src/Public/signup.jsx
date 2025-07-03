// src/registration/RegisterPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Css/signup.css';
import Footer from '../components/footer.jsx';

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
    localStorage.setItem('user', JSON.stringify(form));
    console.log('Form submitted:', form);
  };

  return (
    <>
      <div className="signup-bg">
        <div className="signup-container">
          <div className="signup-header">
            <h2>SIGN-UP</h2>
          </div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="Enter Your Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Please Enter Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Please Enter Your Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Sign-up
            </button>
          </form>
          <div className="signup-footer">
            <span className="signin">
              If you already have an account?{' '}
              <Link to="/login">Login Now</Link>
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;