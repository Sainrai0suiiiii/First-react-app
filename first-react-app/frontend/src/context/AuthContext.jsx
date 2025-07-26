import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiService } from '../utils/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenExpiry, setTokenExpiry] = useState(null);
  const [role, setRole] = useState(null);

  // Check token expiry and auto-logout
  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expiryTime = payload.exp * 1000; // Convert to milliseconds
          const currentTime = Date.now();
          
          if (currentTime >= expiryTime) {
            // Token expired, logout user
            logout();
            return;
          }
          
          // Set expiry time for auto-logout
          setTokenExpiry(expiryTime);
          
          // Set up auto-logout timer
          const timeUntilExpiry = expiryTime - currentTime;
          const logoutTimer = setTimeout(() => {
            logout();
          }, timeUntilExpiry);
          
          return () => clearTimeout(logoutTimer);
        } catch (error) {
          console.error('Error parsing token:', error);
          logout();
        }
      }
    };

    checkTokenExpiry();
  }, []);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && storedUser !== 'null' && storedUser !== 'undefined' && token) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setRole(decodedToken.role);
        
        // Verify token is still valid
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = payload.exp * 1000;
        const currentTime = Date.now();
        
        if (currentTime >= expiryTime) {
          // Token expired, clear storage
          logout();
        } else {
          setTokenExpiry(expiryTime);
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await apiService.login({ email, password });
      
      if (res.data.success) {
        const { user: userData, access_token: token } = res.data.data;
        
        // Parse token to get expiry
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = payload.exp * 1000;
        
        setUser(userData);
        setRole(payload.role);
        setTokenExpiry(expiryTime);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        
        // Set up auto-logout
        const timeUntilExpiry = expiryTime - Date.now();
        setTimeout(() => {
          logout();
        }, timeUntilExpiry);
        
        return userData;
      } else {
        throw new Error(res.data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      return null;
    }
  };

  const register = async (userData) => {
    try {
      const res = await apiService.register(userData);
      
      if (res.data.success) {
        const { user: newUser, access_token: token } = res.data.data;
        
        // Parse token to get expiry
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = payload.exp * 1000;
        
        setUser(newUser);
        setRole(payload.role);
        setTokenExpiry(expiryTime);
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('token', token);
        
        // Set up auto-logout
        const timeUntilExpiry = expiryTime - Date.now();
        setTimeout(() => {
          logout();
        }, timeUntilExpiry);
        
        return newUser;
      } else {
        throw new Error(res.data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      throw new Error(err.response?.data?.error || err.message || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    setTokenExpiry(null);
    setRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Clear any existing timers
    if (window.logoutTimer) {
      clearTimeout(window.logoutTimer);
    }
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('token');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const getTokenExpiry = () => {
    return tokenExpiry;
  };

  const getTimeUntilExpiry = () => {
    if (!tokenExpiry) return 0;
    return Math.max(0, tokenExpiry - Date.now());
  };

  return (
    <AuthContext.Provider value={{
      user,
      role,
      login,
      register,
      logout,
      loading,
      isAuthenticated,
      isAdmin,
      getTokenExpiry,
      getTimeUntilExpiry
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};