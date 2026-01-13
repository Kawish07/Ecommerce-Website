import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { checkAdminAuth } from '../../lib/adminAuth';

export default function SiteStructureGuide() {
  const router = useRouter();

  useEffect(() => {
    if (!checkAdminAuth()) {
      router.push('/admin/login');
    }
  }, [router]);

  const siteStructure = [
    {
      collection: 'men',
      displayName: 'MEN',
      subcategories: [
        { name: 't-shirts', displayName: 'T-Shirts', url: '/collections/men/t-shirts' },
        { name: 'hoodies-jackets', displayName: 'Hoodies & Jackets', url: '/collections/men/hoodies-jackets' },
        { name: 'joggers', displayName: 'Joggers', url: '/collections/men/joggers' },
        { name: 'shorts', displayName: 'Shorts', url: '/collections/men/shorts' },
        { name: 'tanks', displayName: 'Tanks', url: '/collections/men/tanks' },
      ]
    },
    {
      collection: 'women',
      displayName: 'WOMEN',
      subcategories: [
        { name: 't-shirts', displayName: 'T-Shirts', url: '/collections/women/t-shirts' },
        { name: 'leggings', displayName: 'Leggings', url: '/collections/women/leggings' },
        { name: 'sports-bras', displayName: 'Sports Bras', url: '/collections/women/sports-bras' },
        { name: 'jackets', displayName: 'Jackets', url: '/collections/women/jackets' },
        { name: 'the-level-up-set', displayName: 'The Level Up Set', url: '/collections/women/the-level-up-set' },
      ]
    },
    {
      collection: 'accessories',
      displayName: 'ACCESSORIES',
      subcategories: [
        { name: 'all-socks', displayName: 'All Socks', url: '/collections/accessories/all-socks' },
        { name: 'training-socks', displayName: 'Training Socks', url: '/collections/accessories/training-socks' },
        { name: 'no-show-socks', displayName: 'No Show Socks', url: '/collections/accessories/no-show-socks' },
        { name: 'gym-bags', displayName: 'Gym Bags', url: '/collections/accessories/gym-bags' },
        { name: 'backpacks', displayName: 'Backpacks', url: '/collections/accessories/backpacks' },
        { name: 'caps', displayName: 'Caps', url: '/collections/accessories/caps' },
        { name: 'headbands', displayName: 'Headbands', url: '/collections/accessories/headbands' },
      ]
    },
    {
      collection: 'new-in',
      displayName: 'NEW IN',
      subcategories: [
        { name: 'all-new-arrivals', displayName: 'All New Arrivals', url: '/collections/new-in/all-new-arrivals' },
        { name: 't-shirts', displayName: 'T-Shirts', url: '/collections/new-in/t-shirts' },
        { name: 'hoodies', displayName: 'Hoodies', url: '/collections/new-in/hoodies' },
        { name: 'joggers', displayName: 'Joggers', url: '/collections/new-in/joggers' },
      ]
    }
  ];

  return (
    <AdminLayout title="Site Structure Guide">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-2">
            <i className="fas fa-sitemap mr-3"></i>
            Complete Site Structure Reference
          </h1>
          <p className="text-blue-100">
            Follow this guide to organize your collections and products correctly
          </p>
        </div>

        {/* Quick Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-rocket text-blue-600"></i>
            Quick Start: 3 Simple Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
              <h3 className="font-semibold mb-2">Create Collections</h3>
              <p className="text-sm text-gray-600">Go to Collections → Add collections with exact slugs from the table below</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
              <div className="text-2xl font-bold text-green-600 mb-2">2</div>
              <h3 className="font-semibold mb-2">Add Products</h3>
              <p className="text-sm text-gray-600">Go to Products → Select category & subcategory from reference table</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
              <div className="text-2xl font-bold text-purple-600 mb-2">3</div>
              <h3 className="font-semibold mb-2">View Live</h3>
              <p className="text-sm text-gray-600">Visit the URL to see your product on the frontend</p>
            </div>
          </div>
        </div>

        {/* Structure Tables */}
        {siteStructure.map((section) => (
          <div key={section.collection} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-900 text-white px-6 py-4">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <span className="bg-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm">
                  {section.collection[0].toUpperCase()}
                </span>
                {section.displayName}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Collection Slug: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{section.collection}</span>
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Display Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Subcategory Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Full URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      How to Add Product
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {section.subcategories.map((sub) => (
                    <tr key={sub.name} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">{sub.displayName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-blue-600">
                          {sub.name}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={sub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {sub.url}
                          <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="space-y-1 text-gray-600">
                          <div>Category: <code className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{section.collection}</code></div>
                          <div>Subcategory: <code className="bg-green-50 text-green-700 px-2 py-0.5 rounded">{sub.name}</code></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Example */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-l-4 border-green-600">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-lightbulb text-yellow-500"></i>
            Example: Adding Men's T-Shirt
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-gray-700">Step 1: Collection (if not exists)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold">Men</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Slug:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded">men</code>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-gray-700">Step 2: Add Product</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold">Premium Cotton Tee</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded">men</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subcategory:</span>
                  <code className="bg-green-50 text-green-700 px-2 py-1 rounded">t-shirts</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Appears at:</span>
                  <code className="text-purple-600 text-xs">/collections/men/t-shirts</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-3 text-red-900 flex items-center gap-2">
            <i className="fas fa-exclamation-triangle"></i>
            Important Rules
          </h3>
          <ul className="space-y-2 text-sm text-red-800">
            <li className="flex items-start gap-2">
              <i className="fas fa-check-circle mt-1"></i>
              <span>Collection slug must exactly match product category (case-sensitive)</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="fas fa-check-circle mt-1"></i>
              <span>Subcategory must use lowercase with hyphens (e.g., "t-shirts" not "T-Shirts")</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="fas fa-check-circle mt-1"></i>
              <span>Use exact subcategory codes from the tables above for consistency</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="fas fa-check-circle mt-1"></i>
              <span>Multiple products can share the same category + subcategory combination</span>
            </li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4">
          <a
            href="/admin/collections"
            className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
          >
            <i className="fas fa-layer-group mr-2"></i>
            Go to Collections
          </a>
          <a
            href="/admin/products"
            className="flex-1 bg-green-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-700 transition text-center"
          >
            <i className="fas fa-box mr-2"></i>
            Go to Products
          </a>
        </div>
      </div>
    </AdminLayout>
  );
}
