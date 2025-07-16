import React from 'react';
import './AdminUsers.css';

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin', status: 'Active', joined: '2024-01-10' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user', status: 'Active', joined: '2024-02-15' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'user', status: 'Suspended', joined: '2024-03-20' },
  { id: 4, name: 'Diana', email: 'diana@example.com', role: 'user', status: 'Active', joined: '2024-04-05' },
];

const AdminUsers = () => {
  return (
    <div className="admin-users-container">
      <h1 className="users-title">Users</h1>
      <div className="users-table-wrapper">
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
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`user-role user-role-${user.role}`}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                </td>
                <td>
                  <span className={`user-status user-status-${user.status.toLowerCase()}`}>{user.status}</span>
                </td>
                <td>{user.joined}</td>
                <td>
                  <button className="user-action-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers; 