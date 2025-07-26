import { AlertTriangle, Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './SessionTimer.css';

const SessionTimer = () => {
  const { getTimeUntilExpiry, logout } = useAuth();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const remaining = getTimeUntilExpiry();
      setTimeRemaining(remaining);
      
      // Show warning when less than 5 minutes remaining
      if (remaining > 0 && remaining < 5 * 60 * 1000) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
    };

    // Update immediately
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [getTimeUntilExpiry]);

  const formatTime = (milliseconds) => {
    if (milliseconds <= 0) return 'Expired';
    
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const handleExtendSession = () => {
    // This would typically make an API call to refresh the token
    // For now, we'll just hide the warning
    setShowWarning(false);
  };

  const handleLogout = () => {
    logout();
  };

  if (timeRemaining <= 0) {
    return null; // Don't show timer if session is expired
  }

  return (
    <>
      <div className={`session-timer ${showWarning ? 'warning' : ''}`}>
        <Clock size={16} />
        <span>Session: {formatTime(timeRemaining)}</span>
      </div>
      
      {showWarning && (
        <div className="session-warning">
          <div className="warning-content">
            <AlertTriangle size={20} />
            <div className="warning-text">
              <h4>Session Expiring Soon</h4>
              <p>Your session will expire in {formatTime(timeRemaining)}. Would you like to extend it?</p>
            </div>
            <div className="warning-actions">
              <button onClick={handleExtendSession} className="extend-btn">
                Extend Session
              </button>
              <button onClick={handleLogout} className="logout-btn">
                Logout Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionTimer; 