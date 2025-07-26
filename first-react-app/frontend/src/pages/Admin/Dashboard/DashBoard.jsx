import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { useEffect, useState } from "react";
import StatCard from '../../../components/StatCard/StatCard';
import { apiService } from '../../../utils/api'; // adjust path if needed

import './DashBoard.css';

const DashBoard = () => {
  const [summary, setSummary] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch orders safely
        const ordersRes = await apiService.getOrders();
        const rawOrders = ordersRes?.data;
        const orders = Array.isArray(rawOrders?.orders)
          ? rawOrders.orders
          : Array.isArray(rawOrders)
            ? rawOrders
            : [];

        setRecentOrders(orders.slice(0, 5)); // Show only 5 recent orders

        // Fetch products
        const productsRes = await apiService.getProducts();
        const rawProducts = productsRes?.data;
        const products = Array.isArray(rawProducts?.products)
          ? rawProducts.products
          : Array.isArray(rawProducts)
            ? rawProducts
            : [];

        // Fetch users
        const usersRes = await apiService.getUsers();
        const rawUsers = usersRes?.data;
        const users = Array.isArray(rawUsers?.users)
          ? rawUsers.users
          : Array.isArray(rawUsers)
            ? rawUsers
            : [];

        // Revenue calculation
        const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

        // Prepare summary
        const dashboardSummary = [
          {
            label: 'Products',
            value: products.length,
            icon: Package,
            color: 'green',
            trend: 'up',
            trendValue: '12%'
          },
          {
            label: 'Orders',
            value: orders.length,
            icon: ShoppingCart,
            color: 'blue',
            trend: 'up',
            trendValue: '8%'
          },
          {
            label: 'Users',
            value: users.length,
            icon: Users,
            color: 'orange',
            trend: 'up',
            trendValue: '15%'
          },
          {
            label: 'Revenue',
            value: `$${totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            color: 'red',
            trend: 'up',
            trendValue: '23%'
          },
        ];

        setSummary(dashboardSummary);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setSummary([
          { label: 'Products', value: 0, icon: Package, color: 'green' },
          { label: 'Orders', value: 0, icon: ShoppingCart, color: 'blue' },
          { label: 'Users', value: 0, icon: Users, color: 'orange' },
          { label: 'Revenue', value: '$0.00', icon: DollarSign, color: 'red' },
        ]);
        setRecentOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="dashboard-cards">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="dashboard-card loading">
              <div className="card-icon"></div>
              <div className="card-info">
                <div className="card-value">...</div>
                <div className="card-label">Loading...</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="dashboard-cards">
        {summary.map((item) => (
          <StatCard
            key={item.label}
            title={item.label}
            value={item.value}
            icon={item.icon}
            color={item.color}
            trend={item.trend}
            trendValue={item.trendValue}
          />
        ))}
      </div>

      <div className="dashboard-section">
        <h2>Recent Orders</h2>
        <div className="dashboard-table-wrapper">
          {recentOrders.length > 0 ? (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName || order.user?.name || 'N/A'}</td>
                    <td>${order.total || order.amount || '0.00'}</td>
                    <td>
                      <span className={`status-badge status-${(order.status || 'pending').toLowerCase()}`}>
                        {order.status || 'Pending'}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt || order.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-data">
              <p>No recent orders found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
