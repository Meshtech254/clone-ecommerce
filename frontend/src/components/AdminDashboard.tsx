import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';

interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  pendingOrders: number;
  lowStockProducts: number;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<AdminStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockProducts: 0
  });

  useEffect(() => {
    // Fetch admin stats
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      // Mock data for now - replace with actual API calls
      setStats({
        totalProducts: 24,
        totalOrders: 156,
        totalUsers: 89,
        totalRevenue: 45678.90,
        pendingOrders: 12,
        lowStockProducts: 3
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Clo'ne Admin</h1>
              <span className="ml-3 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                Admin Panel
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome back, Admin</span>
              <Link 
                to="/" 
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64">
            <nav className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
              <ul className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: '📊' },
                  { id: 'products', label: 'Products', icon: '👕' },
                  { id: 'orders', label: 'Orders', icon: '📦' },
                  { id: 'users', label: 'Users', icon: '👥' },
                  { id: 'analytics', label: 'Analytics', icon: '📈' },
                  { id: 'settings', label: 'Settings', icon: '⚙️' }
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'overview' && <OverviewTab stats={stats} />}
            {activeTab === 'products' && <ProductManagement />}
            {activeTab === 'orders' && <OrderManagement />}
            {activeTab === 'users' && <UsersTab />}
            {activeTab === 'analytics' && <AnalyticsTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </main>
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab: React.FC<{ stats: AdminStats }> = ({ stats }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">👕</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">📦</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900">{stats.lowStockProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { action: 'New order received', time: '2 minutes ago', type: 'order' },
                { action: 'Product stock updated', time: '15 minutes ago', type: 'product' },
                { action: 'New user registered', time: '1 hour ago', type: 'user' },
                { action: 'Payment processed', time: '2 hours ago', type: 'payment' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-3 ${
                      item.type === 'order' ? 'bg-blue-500' :
                      item.type === 'product' ? 'bg-green-500' :
                      item.type === 'user' ? 'bg-purple-500' : 'bg-yellow-500'
                    }`}></span>
                    <span className="text-sm text-gray-900">{item.action}</span>
                  </div>
                  <span className="text-sm text-gray-500">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Users Tab Component
const UsersTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          + Add User
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Users</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-center py-8">User management interface coming soon...</p>
        </div>
      </div>
    </div>
  );
};

// Analytics Tab Component
const AnalyticsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h3>
          <p className="text-gray-500 text-center py-8">Sales charts coming soon...</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
          <p className="text-gray-500 text-center py-8">Product performance coming soon...</p>
        </div>
      </div>
    </div>
  );
};

// Settings Tab Component
const SettingsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">General Settings</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-center py-8">Settings interface coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
