import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children, requireAdmin = false, requireAuth = true }) => {
  const { user, loading, role } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  // If authentication is not required, render children
  if (!requireAuth) {
    return children;
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If admin access is required but user is not admin
  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has proper permissions
  return children;
};

// Special component for cart protection
export const ProtectedCartRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="auth-required-container">
        <div className="auth-required-card">
          <h2>Login Required</h2>
          <p>Please login to access your shopping cart.</p>
          <div className="auth-actions">
            <button 
              className="btn btn-primary"
              onClick={() => window.location.href = '/login'}
            >
              Login
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => window.location.href = '/register'}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute; 