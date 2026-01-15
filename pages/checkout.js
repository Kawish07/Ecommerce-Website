import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderData, setOrderData] = useState(null);
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: 'Pakistan',
    postalCode: '',
    phone: ''
  });

  const SHIPPING_COST = 4315; 

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.postalCode || !formData.phone) {
      alert('Please fill in all required fields.');
      return;
    }
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: cart, 
          shippingAddress: formData,
          paymentMethod: 'Cash on Delivery'
        })
      });
      const data = await res.json();
      
      if (data.ok) {
        const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
        setOrderData({
          items: cart,
          shippingAddress: formData,
          subtotal,
          total: subtotal + SHIPPING_COST,
          orderDate: new Date().toLocaleDateString()
        });
        setShowSuccessModal(true);
        clear();
        setFormData({
          email: '', firstName: '', lastName: '', address: '', city: '', country: 'Pakistan', postalCode: '', phone: ''
        });
      } else {
        alert('Checkout failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setOrderData(null);
    window.location.href = '/';
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal + SHIPPING_COST;

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-red-600 selection:text-white">
      <Header forceSolid />
      
      <style jsx global>{`
        /* Input Autofill fix for dark mode */
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
          -webkit-box-shadow: 0 0 0 30px #1a1a1a inset !important;
          -webkit-text-fill-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      <main className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-24 pb-12 lg:pb-20">
        
        {/* Header */}
        <div className="mb-8 flex items-end justify-between border-b border-gray-800 pb-6">
          <div className='mt-5'>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-2">Checkout</h1>
            <p className="text-gray-500 text-sm">Complete your secure purchase</p>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Cart Items</span>
            <span className="block text-xl font-bold text-red-500">{cart.length}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT COLUMN: FORMS --- */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Contact Card */}
            <section className="bg-[#111] border border-gray-800 p-8 rounded-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white text-xs font-bold">1</span>
                <h2 className="text-lg font-bold uppercase tracking-widest">Contact Information</h2>
              </div>
              <div className="space-y-1 relative group">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="you@example.com" 
                  className="w-full bg-[#1a1a1a] text-white px-4 py-3 border border-gray-700 focus:border-red-600 outline-none transition-colors duration-300 rounded-sm"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </section>

            {/* Delivery Card */}
            <section className="bg-[#111] border border-gray-800 p-8 rounded-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-white text-xs font-bold">2</span>
                <h2 className="text-lg font-bold uppercase tracking-widest">Delivery Address</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1 group">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    placeholder="John" 
                    className="w-full bg-[#1a1a1a] text-white px-4 py-3 border border-gray-700 focus:border-red-600 outline-none transition-colors duration-300 rounded-sm"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-1 group">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    placeholder="Doe" 
                    className="w-full bg-[#1a1a1a] text-white px-4 py-3 border border-gray-700 focus:border-red-600 outline-none transition-colors duration-300 rounded-sm"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-1 group md:col-span-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Address</label>
                  <input 
                    type="text" 
                    name="address"
                    placeholder="Street address, apartment, suite, unit, building, floor, etc." 
                    className="w-full bg-[#1a1a1a] text-white px-4 py-3 border border-gray-700 focus:border-red-600 outline-none transition-colors duration-300 rounded-sm"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-1 group">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">City</label>
                  <input 
                    type="text" 
                    name="city"
                    placeholder="Karachi" 
                    className="w-full bg-[#1a1a1a] text-white px-4 py-3 border border-gray-700 focus:border-red-600 outline-none transition-colors duration-300 rounded-sm"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-1 group">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Postal Code</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    placeholder="75000" 
                    className="w-full bg-[#1a1a1a] text-white px-4 py-3 border border-gray-700 focus:border-red-600 outline-none transition-colors duration-300 rounded-sm"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-1 group md:col-span-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="+92 300 1234567" 
                    className="w-full bg-[#1a1a1a] text-white px-4 py-3 border border-gray-700 focus:border-red-600 outline-none transition-colors duration-300 rounded-sm"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </section>

            {/* Shipping Method Card */}
            <section className="bg-[#111] border border-gray-800 p-8 rounded-sm">
              <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-gray-800 pb-4">Shipping Method</h2>
              <div className="border border-gray-700 p-5 flex justify-between items-center bg-[#1a1a1a] hover:border-red-600 transition-colors duration-300 cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-600 group-hover:border-red-600 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Express Courier (COD)</p>
                    <p className="text-xs text-gray-500 mt-1">3-4 Business days</p>
                  </div>
                </div>
                <span className="font-bold text-white">Rs {SHIPPING_COST.toLocaleString()}</span>
              </div>
            </section>

          </div>

          {/* --- RIGHT COLUMN: STICKY SUMMARY --- */}
          <div className="lg:col-span-5 relative h-full">
            <div className="sticky top-24 bg-[#111] border border-gray-800 rounded-sm overflow-hidden shadow-2xl backdrop-blur-xl bg-opacity-90">
              
              {/* Header */}
              <div className="p-6 bg-[#151515] border-b border-gray-800">
                <h3 className="font-black uppercase tracking-widest text-sm">Your Order</h3>
              </div>

              {/* Items Scroll List */}
              <div className="p-6 max-h-[300px] overflow-y-auto custom-scrollbar space-y-6">
                {cart.length > 0 ? (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4 group/item">
                      <div className="w-16 h-16 bg-[#0a0a0a] rounded-sm overflow-hidden flex-shrink-0 border border-gray-800">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover opacity-80 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all duration-500"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/150/000000/FFFFFF/?text=IMG"; }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 line-clamp-1 w-3/4">{item.name}</h4>
                          <span className="text-xs font-bold text-white">Rs {Math.round(item.price).toLocaleString()}</span>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-600 text-sm font-medium italic">Your bag is empty.</div>
                )}
              </div>

              {/* Discount Code */}
              <div className="px-6 py-4 border-t border-gray-800">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Discount code" 
                    className="flex-1 bg-[#1a1a1a] border border-gray-800 px-3 py-2 text-xs focus:border-red-600 outline-none transition-colors text-white"
                  />
                  <button className="px-4 py-2 bg-[#222] text-white text-xs font-bold uppercase hover:bg-gray-600 transition-colors duration-300">
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="p-6 border-t border-gray-800 space-y-4 bg-[#0f0f0f]">
                <div className="flex justify-between text-xs font-medium text-gray-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>Rs {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-gray-400 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span>Rs {SHIPPING_COST.toLocaleString()}</span>
                </div>
                
                <div className="border-t border-gray-800 pt-4 flex justify-between items-end">
                  <span className="text-sm font-bold uppercase tracking-widest text-gray-300">Total</span>
                  <span className="text-2xl font-black text-white tracking-tighter">Rs {total.toLocaleString()}</span>
                </div>

                <button 
                  onClick={handleCheckout} 
                  disabled={loading || cart.length === 0}
                  className="w-full bg-white text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black mt-4 rounded-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full"></span>
                  ) : (
                    'Complete Order'
                  )}
                </button>
                
                <p className="text-[10px] text-center text-gray-600 mt-4 font-medium">
                  Your payment information is processed securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[60] p-4 animate-fade-in">
          <div className="bg-[#111] border border-gray-700 rounded-sm shadow-2xl max-w-md w-full p-10 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-red-400 to-red-600"></div>
            
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full border-2 border-green-500/30 bg-green-500/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">Order Placed!</h2>
            <p className="text-gray-400 mb-8 text-sm">Thank you for shopping with Squatwolf.</p>

            <div className="bg-[#1a1a1a] p-5 rounded-sm border border-gray-800 text-left mb-8">
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-gray-500 uppercase tracking-wider border-b border-gray-800 pb-2">
                  <span>Date</span>
                  <span className="text-white">{orderData?.orderDate}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 uppercase tracking-wider border-b border-gray-800 pb-2">
                  <span>Total Items</span>
                  <span className="text-white">{orderData?.items?.length}</span>
                </div>
                <div className="flex justify-between text-sm text-white font-bold pt-1">
                  <span className="uppercase tracking-wider">Total</span>
                  <span>Rs {orderData?.total?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCloseModal}
              className="w-full bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}