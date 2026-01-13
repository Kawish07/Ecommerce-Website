import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderData, setOrderData] = useState(null);
  
  // State for form inputs
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: 'Pakistan', // Based on currency Rs in screenshot
    postalCode: '',
    phone: ''
  });

  // Constants for pricing calculation (Simulating screenshot data)
  const SHIPPING_COST = 4315; 
  const TAX_RATE = 0.0; // Adjust if needed, screenshot shows tax breakdowns but simple addition

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    // Basic Validation - check all required fields
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.postalCode || !formData.phone) {
      alert('Please fill in all required fields.');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty. Please add products before checkout.');
      return;
    }

    setLoading(true);
    
    // Simulate API Call
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: cart, 
          shippingAddress: formData,
          paymentMethod: 'Cash on Delivery' // Enforce COD
        })
      });
      
      const data = await res.json();
      
      if (data.ok) {
        // Store order data for modal
        const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
        const total = subtotal + SHIPPING_COST;
        
        setOrderData({
          items: cart,
          shippingAddress: formData,
          subtotal,
          total,
          orderDate: new Date().toLocaleDateString()
        });
        
        // Show success modal
        setShowSuccessModal(true);
        
        // Clear cart and form
        clear();
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          country: 'Pakistan',
          postalCode: '',
          phone: ''
        });
      } else {
        alert('Checkout failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setOrderData(null);
    window.location.href = '/';
  };

  // Calculate Totals
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal + SHIPPING_COST; // Simplified total logic

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      <Header forceSolid />
      
      <main className="max-w-[1200px] mx-auto px-4 py-12 lg:py-16 mt-[80px] ">
        <h1 className="text-3xl font-medium tracking-tight text-center mb-12 uppercase">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT COLUMN: SCROLLABLE FORMS --- */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Contact Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Contact</h2>
              </div>
              <div className="space-y-4">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  className="w-full p-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </section>

            {/* Delivery Section */}
            <section>
              <h2 className="text-lg font-semibold mb-6">Delivery</h2>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="First name" 
                  className="w-full p-3 border border-gray-300 focus:border-black focus:outline-none"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Last name" 
                  className="w-full p-3 border border-gray-300 focus:border-black focus:outline-none"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                <input 
                  type="text" 
                  name="address"
                  placeholder="Address" 
                  className="col-span-2 w-full p-3 border border-gray-300 focus:border-black focus:outline-none"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                <input 
                  type="text" 
                  name="city"
                  placeholder="City" 
                  className="w-full p-3 border border-gray-300 focus:border-black focus:outline-none"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
                <input 
                  type="text" 
                  name="country"
                  placeholder="Country" 
                  className="w-full p-3 border border-gray-300 focus:border-black focus:outline-none bg-gray-50 text-gray-600"
                  value={formData.country}
                  readOnly
                />
                <input 
                  type="text" 
                  name="postalCode"
                  placeholder="Postal code" 
                  className="w-full p-3 border border-gray-300 focus:border-black focus:outline-none"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone" 
                  className="w-full p-3 border border-gray-300 focus:border-black focus:outline-none"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </section>

            {/* Shipping Method (COD only) */}
            <section>
              <h2 className="text-lg font-semibold mb-6">Shipping method</h2>
              <div className="border border-gray-300 p-4 flex justify-between items-center bg-gray-50">
                <div>
                  <p className="font-medium">Cash on Delivery / Express Courier</p>
                  <p className="text-sm text-gray-500">3 to 4 Business days</p>
                </div>
                <span className="font-medium">Rs {SHIPPING_COST.toLocaleString()}</span>
              </div>
            </section>

            {/* Payment Method (COD only) */}
            <section>
              <h2 className="text-lg font-semibold mb-6">Payment</h2>
              <div className="border border-gray-300 p-4 flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-3">
                  {/* Radio button visual */}
                  <div className="w-4 h-4 rounded-full border border-black flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                  </div>
                  <span className="font-medium">Cash on Delivery</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                You will pay the full amount upon delivery.
              </p>
            </section>

            {/* Billing Info Text */}
            <div className="text-xs text-gray-500 pt-4 border-t">
              <p>By placing this order, you agree to our Terms and Conditions.</p>
            </div>
          </div>

          {/* --- RIGHT COLUMN: STICKY SUMMARY --- */}
          <div className="lg:col-span-5 relative h-full">
            {/* This div is sticky. top-24 ensures it doesn't overlap the Header */}
            <div className="sticky top-24 border border-gray-200 rounded-md overflow-hidden">
              
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                {cart.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        {/* Product Image */}
                        <img 
                          src={cart[0]?.image || "https://via.placeholder.com/150"} 
                          alt={cart[0]?.name || "Product"} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/150";
                          }}
                        />
                      </div>
                      <div className="flex-1 ml-4">
                        <p className="font-semibold text-sm">{cart[0]?.name || 'Product'}</p>
                        <p className="text-gray-500 text-xs mt-1">Rs {cart[0]?.price?.toLocaleString() || '0'}</p>
                        <p className="text-gray-900 text-sm mt-1">Qty: {cart[0]?.quantity || 1}</p>
                        {cart.length > 1 && <p className="text-gray-500 text-xs mt-1">+{cart.length - 1} more item(s)</p>}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                )}

                {/* Discount Code */}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Discount code" 
                    className="flex-1 p-2 border border-gray-300 text-sm focus:outline-none"
                  />
                  <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium hover:bg-gray-100 transition">
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>Rs {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>Rs {SHIPPING_COST.toLocaleString()}</span>
                </div>
                
                <div className="border-t border-gray-200 my-4 pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>Rs {total.toLocaleString()}</span>
                </div>

                <button 
                  onClick={handleCheckout} 
                  disabled={loading || cart.length === 0}
                  className="w-full bg-black text-white py-4 font-medium tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'COMPLETE ORDER'}
                </button>
              </div>
              
              <div className="p-4 text-center border-t border-gray-200 text-xs text-gray-400">
                <p>Secure Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
            {/* Checkmark Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Complete!</h2>
              <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>

              {/* Order Details */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-semibold">{orderData?.orderDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items:</span>
                    <span className="font-semibold">{orderData?.items?.length || 0}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between text-sm">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-bold text-lg">Rs {orderData?.total?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery To:</span>
                    <span className="font-semibold text-right">{orderData?.shippingAddress?.city}, {orderData?.shippingAddress?.country}</span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <p className="text-sm text-gray-600 mb-6">
                Thank you for your order! You will receive a confirmation email shortly. Your order will be delivered within 3-4 business days via Express Courier.
              </p>

              {/* Button */}
              <button
                onClick={handleCloseModal}
                className="w-full bg-black text-white py-3 font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}