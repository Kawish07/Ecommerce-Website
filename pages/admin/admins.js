import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';
import { checkAdminAuth } from '../../lib/adminAuth';

export default function AdminsPage() {
  const router = useRouter();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'admin',
    name: '',
    email: '',
  });

  useEffect(() => {
    if (!checkAdminAuth()) {
      router.push('/admin/login');
      return;
    }
    fetchAdmins();
  }, [router]);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/admins');
      const data = await res.json();
      setAdmins(data.admins || []);
    } catch (error) {
      console.error('Failed to fetch admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (admin = null) => {
    setEditingAdmin(admin);
    setForm({
      username: admin?.username || '',
      password: '',
      role: admin?.role || 'admin',
      name: admin?.name || '',
      email: admin?.email || '',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAdmin(null);
    setForm({ username: '', password: '', role: 'admin', name: '', email: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingAdmin && !form.password) {
      alert('Password is required for a new admin');
      return;
    }

    try {
      const method = editingAdmin ? 'PUT' : 'POST';
      const payload = {
        ...form,
        id: editingAdmin?._id,
      };

      // Do not send empty password when editing
      if (editingAdmin && !form.password) {
        delete payload.password;
      }

      const res = await fetch('/api/admin/admins', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to save admin');
        return;
      }

      fetchAdmins();
      closeModal();
    } catch (error) {
      console.error('Save admin error:', error);
      alert('Something went wrong.');
    }
  };

  const handleDelete = async (admin) => {
    if (!confirm(`Delete admin ${admin.username}?`)) return;

    try {
      const res = await fetch('/api/admin/admins', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: admin._id }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to delete admin');
        return;
      }

      fetchAdmins();
    } catch (error) {
      console.error('Delete admin error:', error);
      alert('Something went wrong.');
    }
  };

  const filteredAdmins = admins.filter((admin) => {
    if (!search) return true;
    return (
      admin.username?.toLowerCase().includes(search.toLowerCase()) ||
      admin.name?.toLowerCase().includes(search.toLowerCase()) ||
      admin.email?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <AdminLayout title="Admins Management">
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Manage who can access your dashboard</p>
            <p className="text-sm text-gray-500 mt-1">
              <i className="fas fa-info-circle mr-1"></i>
              Admins stored in the database; passwords are hashed with bcrypt
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            <i className="fas fa-user-plus mr-2"></i>
            Add Admin
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 flex gap-4 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search admins by name, username, or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <i className="fas fa-spinner fa-spin text-4xl text-gray-400"></i>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-50 px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Username</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          <div>
            {filteredAdmins.map((admin) => (
              <div
                key={admin._id}
                className="grid grid-cols-12 items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <div className="col-span-3">
                  <p className="font-semibold text-gray-900">{admin.name || '—'}</p>
                  <p className="text-sm text-gray-500">{admin.email || 'No email'}</p>
                </div>
                <div className="col-span-2 text-gray-800">{admin.username}</div>
                <div className="col-span-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    {admin.role || 'admin'}
                  </span>
                </div>
                <div className="col-span-3 text-sm text-gray-700">
                  {admin.createdAt ? new Date(admin.createdAt).toLocaleString() : '—'}
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <button
                    onClick={() => openModal(admin)}
                    className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                  >
                    <i className="fas fa-edit mr-1"></i>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(admin)}
                    className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                  >
                    <i className="fas fa-trash mr-1"></i>
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {!filteredAdmins.length && (
              <div className="text-center py-10 text-gray-500">No admins found</div>
            )}
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold">
                {editingAdmin ? 'Edit Admin' : 'Add Admin'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                  disabled={!!editingAdmin}
                />
                {editingAdmin && (
                  <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password {editingAdmin ? '(leave blank to keep current)' : '*'}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder={editingAdmin ? 'Keep existing password' : 'Set a password'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  {editingAdmin ? 'Save Changes' : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
