import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';
import { checkAdminSession } from '../../lib/adminAuth';

export default function ProductsManagement() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    subcategory: '',
    description: '',
    image: '',
    video: '',
    stock: '',
    tag: '',
  });

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verify = async () => {
      if (!(await checkAdminSession())) {
        router.replace('/admin/login');
        return;
      }
      setAuthorized(true);
      fetchProducts();
      fetchCollections();
    };
    verify();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCollections = async () => {
    try {
      const res = await fetch('/api/admin/collections');
      const data = await res.json();
      setCollections(data.collections || []);
    } catch (error) {
      console.error('Failed to fetch collections:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const body = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        id: editingProduct?.id || editingProduct?._id,
      };

      const res = await fetch('/api/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        fetchProducts();
        closeModal();
      } else {
        alert(data.error || 'Failed to save product');
      }
    } catch (error) {
      alert('An error occurred');
    }
  };

  const handleDelete = async (product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    try {
      const res = await fetch(`/api/products/${product.id || product._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchProducts();
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      alert('An error occurred');
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category || '',
        subcategory: product.subcategory || '',
        description: product.description || product.desc || '',
        image: product.image || '',
        video: product.video || '',
        stock: product.stock || 0,
        tag: product.tag || '',
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: '',
        category: '',
        subcategory: '',
        description: '',
        image: '',
        video: '',
        stock: '',
        tag: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!authorized) {
    return (
      <AdminLayout title="Products Management">
        <div className="flex items-center justify-center h-64">
          <i className="fas fa-spinner fa-spin text-4xl text-gray-400"></i>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Products Management">
      {/* Header Actions */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Manage your products inventory</p>
            <p className="text-sm text-gray-500 mt-1">
              <i className="fas fa-info-circle mr-1"></i>
              Products appear on: <span className="font-mono text-blue-600">/collections/[category]/[subcategory]</span>
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 flex gap-4 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Categories</option>
            {collections.map((cat) => (
              <option key={cat._id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <i className="fas fa-spinner fa-spin text-4xl text-gray-400"></i>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id || product._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-56 bg-gray-200 relative">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="fas fa-box text-6xl text-gray-400"></i>
                  </div>
                )}
                {product.tag && (
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {product.tag}
                  </span>
                )}
                {product.stock !== undefined && product.stock < 10 && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    Low Stock
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {product.category} {product.subcategory && `• ${product.subcategory}`}
                </p>
                <p className="text-lg font-bold text-blue-600 mb-2">
                  Rs {Math.round(product.price || 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Stock: <span className="font-semibold">{product.stock || 0}</span>
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(product)}
                    className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition"
                  >
                    <i className="fas fa-edit mr-1"></i>Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                  >
                    <i className="fas fa-trash mr-1"></i>Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <i className="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">No products found</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (Rs) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Select category</option>
                    {collections.map((cat) => (
                      <option key={cat._id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Main collection (e.g., men, women)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="e.g., t-shirts, hoodies, socks"
                  />
                  <p className="text-xs text-gray-500 mt-1">Product type - appears at /collections/category/subcategory</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tag
                  </label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="e.g., NEW DROP, BESTSELLER"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.video}
                  onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="https://example.com/video.mp4"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  {editingProduct ? 'Update' : 'Create'} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
