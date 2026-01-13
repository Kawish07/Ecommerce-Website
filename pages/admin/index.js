import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';
import { checkAdminAuth, getAdminToken } from '../../lib/adminAuth';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const isAuth = checkAdminAuth();
    console.log('Auth check:', isAuth);
    
    if (!isAuth) {
      router.push('/admin/login');
      return;
    }
    fetchAnalytics();
  }, [router, mounted]);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/admin/analytics', {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      });
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <i className="fas fa-spinner fa-spin text-4xl text-gray-400"></i>
        </div>
      </AdminLayout>
    );
  }

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <AdminLayout title="Dashboard">
      {/* Quick Guide Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <i className="fas fa-info-circle text-blue-600 text-xl mt-0.5"></i>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-2">Quick Start Guide</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>1. Collections:</strong> Create categories (e.g., "men", "women", "accessories")</p>
              <p><strong>2. Products:</strong> Add products with category="men" and subcategory="socks"</p>
              <p><strong>3. View on site:</strong> Product appears at <span className="font-mono bg-white px-2 py-0.5 rounded">/collections/men/socks</span></p>
              <p className="text-xs mt-2 text-blue-700">💡 Tip: Category must match collection slug, subcategory can be any product type</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={`Rs ${(analytics?.totalRevenue || 0).toLocaleString()}`}
          icon="fa-dollar-sign"
          color="bg-blue-500"
          trend="+12.5%"
        />
        <StatCard
          title="Total Orders"
          value={analytics?.totalOrders || 0}
          icon="fa-shopping-cart"
          color="bg-green-500"
          trend="+8.2%"
        />
        <StatCard
          title="Total Products"
          value={analytics?.totalProducts || 0}
          icon="fa-box"
          color="bg-yellow-500"
          trend="+3"
        />
        <StatCard
          title="Customers"
          value={analytics?.totalCustomers || 0}
          icon="fa-users"
          color="bg-purple-500"
          trend="+5.7%"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Sales Overview (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics?.salesByDay || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(new Date(date), 'MMM dd')}
                stroke="#666"
              />
              <YAxis stroke="#666" />
              <Tooltip
                formatter={(value) => `Rs ${value.toLocaleString()}`}
                labelFormatter={(date) => format(new Date(date), 'MMM dd, yyyy')}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Selling Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics?.topProducts || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Bar dataKey="sold" fill="#10B981" name="Units Sold" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue by Product */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue by Product</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics?.topProducts || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="revenue"
              >
                {(analytics?.topProducts || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `Rs ${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {(analytics?.recentOrders || []).slice(0, 5).map((order, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.items?.length || 0} item(s)
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">
                    Rs {(order.items?.reduce((s, i) => s + (i.price * i.quantity), 0) || 0).toLocaleString()}
                  </p>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </div>
              </div>
            ))}
            {(!analytics?.recentOrders || analytics.recentOrders.length === 0) && (
              <p className="text-sm text-gray-500 text-center py-4">No recent orders</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, icon, color, trend }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
          <i className={`fas ${icon} text-xl`}></i>
        </div>
        <span className="text-sm font-semibold text-green-600">{trend}</span>
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
