import { Calendar, Edit, Mail, MapPin, Phone, Save, Shield, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../utils/api';
import './Profile.css';

const Profile = () => {
  const { user, logout, getTimeUntilExpiry } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await apiService.updateProfile(formData);
      if (response.data.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        // Update local user data
        window.location.reload(); // Simple refresh for now
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeUntilExpiry = () => {
    const timeUntilExpiry = getTimeUntilExpiry();
    if (timeUntilExpiry <= 0) return 'Expired';
    
    const hours = Math.floor(timeUntilExpiry / (1000 * 60 * 60));
    const minutes = Math.floor((timeUntilExpiry % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes}m remaining`;
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="not-authenticated">
            <h2>Please log in to view your profile</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <div className="profile-actions">
            {!isEditing ? (
              <button 
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                <Edit size={16} />
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button 
                  className="save-btn"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  <Save size={16} />
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button 
                  className="cancel-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setError('');
                    setSuccess('');
                    // Reset form data
                    setFormData({
                      name: user.name || '',
                      phone: user.phone || '',
                      address: user.address || ''
                    });
                  }}
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            )}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="profile-content">
          <div className="profile-section">
            <h2>Account Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">
                  <User size={20} />
                </div>
                <div className="info-content">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <span>{user.name || 'Not provided'}</span>
                  )}
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Mail size={20} />
                </div>
                <div className="info-content">
                  <label>Email Address</label>
                  <span>{user.email}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Phone size={20} />
                </div>
                <div className="info-content">
                  <label>Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <span>{user.phone || 'Not provided'}</span>
                  )}
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={20} />
                </div>
                <div className="info-content">
                  <label>Delivery Address</label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your delivery address"
                      rows="3"
                    />
                  ) : (
                    <span>{user.address || 'Not provided'}</span>
                  )}
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Shield size={20} />
                </div>
                <div className="info-content">
                  <label>Account Type</label>
                  <span className={`role-badge role-${user.role}`}>
                    {user.role === 'admin' ? 'Administrator' : 'Customer'}
                  </span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Calendar size={20} />
                </div>
                <div className="info-content">
                  <label>Last Login</label>
                  <span>{formatDate(user.lastLoginAt)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Session Information</h2>
            <div className="session-info">
              <div className="session-item">
                <label>Session Expires In:</label>
                <span className="session-timer">{formatTimeUntilExpiry()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;