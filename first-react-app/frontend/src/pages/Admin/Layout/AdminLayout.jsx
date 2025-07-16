import {
    LayoutDashboard,
    LogOut,
    Package,
    Settings,
    ShoppingBag,
    ShoppingCart,
    Users
} from 'lucide-react';
import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      path: '/admin/dashboard',
      icon: <LayoutDashboard />,
      label: 'Dashboard'
    },
    {
      path: '/admin/products',
      icon: <Package />,
      label: 'Products'
    },
    {
      path: '/admin/orders',
      icon: <ShoppingCart />,
      label: 'Orders'
    },
    {
      path: '/admin/users',
      icon: <Users />,
      label: 'Users'
    },
    {
      path: '/admin/settings',
      icon: <Settings />,
      label: 'Settings'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Link to="/admin/dashboard" className="sidebar-logo">
            <ShoppingBag className="logo-icon" />
            <span>FreshMart Admin</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-menu">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name || 'Admin'}</span>
              <span className="user-role">Administrator</span>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut className="logout-icon" />
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;