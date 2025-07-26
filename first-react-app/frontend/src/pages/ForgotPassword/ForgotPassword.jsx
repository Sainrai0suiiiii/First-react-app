import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setIsSubmitted(false);

    try {
      await axios.post('http://localhost:5001/api/v1/auth/forgot-password', { email });
      setIsSubmitted(true);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'Failed to send reset instructions. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-header">
          <Link to="/login" className="back-link">
            Back to Login
          </Link>
          <div className="header-content">
            <h1>Forgot Password?</h1>
            <p>Enter your email address and we'll send you instructions to reset your password.</p>
          </div>
        </div>

        <form className="forgot-password-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {isSubmitted && (
            <div className="success-message">
              <span>Password reset instructions have been sent to your email address.</span>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                autoComplete="email"
              />
            </div>
          </div>
          <button
            type="submit"
            className={`submit-btn${isLoading ? ' loading' : ''}`}
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Sending...
              </>
            ) : (
              'Send Reset Instructions'
            )}
          </button>
        </form>

        <div className="forgot-password-footer">
          <p>Remember your password? <Link to="/login">Sign in here</Link></p>
          <p>Don't have an account? <Link to="/register">Sign up here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;