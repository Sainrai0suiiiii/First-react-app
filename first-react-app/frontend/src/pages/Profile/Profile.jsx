import { Edit, Mail, MapPin, Phone, Save, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // In a real app, this would make an API call to update user data
    console.log('Saving profile:', formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="not-logged-in">
            <h2>Please log in to view your profile</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <User size={60} />
            </div>
            <div className="profile-title">
              <h1>My Profile</h1>
              <p>Manage your account information</p>
            </div>
            {!isEditing ? (
              <button 
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                <Edit size={20} />
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button 
                  className="save-btn"
                  onClick={handleSave}
                >
                  <Save size={20} />
                  Save
                </button>
                <button 
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  <X size={20} />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="profile-content">
            <div className="profile-form">
              <div className="form-group">
                <label className="form-label">
                  <User size={20} />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <div className="form-display">{user.name}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Mail size={20} />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <div className="form-display">{user.email}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Phone size={20} />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <div className="form-display">{user.phone}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <MapPin size={20} />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="3"
                  ></textarea>
                ) : (
                  <div className="form-display">{user.address}</div>
                )}
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-card">
                <h3>Account Stats</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-value">12</span>
                    <span className="stat-label">Total Orders</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">₹2,450</span>
                    <span className="stat-label">Total Spent</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">Member Since</span>
                    <span className="stat-label">Jan 2024</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">⭐ 4.9</span>
                    <span className="stat-label">Rating</span>
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <button className="action-btn">View Orders</button>
                  <button className="action-btn">Wishlist</button>
                  <button className="action-btn">Change Password</button>
                  <button className="action-btn">Notifications</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;