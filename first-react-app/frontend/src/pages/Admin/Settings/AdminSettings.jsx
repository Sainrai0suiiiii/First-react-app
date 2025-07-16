import React, { useState } from 'react';
import './AdminSettings.css';

const initialSettings = {
  siteName: 'FreshMart',
  adminEmail: 'admin@valleyfresh.com',
  maintenanceMode: false,
  notifications: true,
};

const AdminSettings = () => {
  const [settings, setSettings] = useState(initialSettings);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send settings to the backend
    alert('Settings saved!');
  };

  return (
    <div className="admin-settings-container">
      <h1 className="settings-title">Settings</h1>
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="settings-group">
          <label>Site Name</label>
          <input
            type="text"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
          />
        </div>
        <div className="settings-group">
          <label>Admin Email</label>
          <input
            type="email"
            name="adminEmail"
            value={settings.adminEmail}
            onChange={handleChange}
          />
        </div>
        <div className="settings-group settings-checkbox">
          <label>
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
            />
            Maintenance Mode
          </label>
        </div>
        <div className="settings-group settings-checkbox">
          <label>
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />
            Enable Notifications
          </label>
        </div>
        <button className="settings-save-btn" type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default AdminSettings; 