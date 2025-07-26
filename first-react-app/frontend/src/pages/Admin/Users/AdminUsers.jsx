import React, { useEffect, useState } from "react";
import { apiService } from '../../../utils/api';
import './AdminUsers.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await apiService.getUsers();

        // Log for debugging (optional)
        console.log("Fetched users:", response.data);

        // Ensure users is always an array
        setUsers(Array.isArray(response.data.users) ? response.data.users : []);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="admin-users-container">
        <h1 className="users-title">Users</h1>
        <div className="loading-message">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-users-container">
        <h1 className="users-title">Users</h1>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="admin-users-container">
      <h1 className="users-title">Users</h1>
      <div className="users-table-wrapper">
        {users.length === 0 ? (
          <div className="no-data">No users found.</div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id ?? 'N/A'}</td>
                  <td>{user.name || 'Unnamed User'}</td>
                  <td>{user.email || 'No email'}</td>
                  <td>
                    <span className={`user-role user-role-${user.role || 'user'}`}>
                      {(user.role || 'user').charAt(0).toUpperCase() + (user.role || 'user').slice(1)}
                    </span>
                  </td>
                  <td>
                    <span className={`user-status user-status-${(user.status || 'active').toLowerCase()}`}>
                      {user.status || 'Active'}
                    </span>
                  </td>
                  <td>
                    {user.createdAt || user.joined
                      ? new Date(user.createdAt || user.joined).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td>
                    <button className="user-action-btn">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
