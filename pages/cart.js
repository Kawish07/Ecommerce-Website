import Link from 'next/link';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, remove, clear } = useCart();
  
  // Calculate Totals
  const subtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  // Assuming shipping estimate or 0 for now
  const shippingCost = subtotal > 0 ? 4315 : 0; 
  const total = subtotal + shippingCost;

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-red-600 selection:text-white">
      <Header />
      
      <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12 lg:py-20 mt-[60px]">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-12 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-2">Shopping Cart</h1>
            <p className="text-gray-500 text-sm">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in your bag
            </p>
          </div>
          
          {cart.length > 0 && (
            <button 
              onClick={clear}
              className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          // ================= EMPTY STATE =================
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 bg-[#111] rounded-full flex items-center justify-center mb-6 border border-gray-800">
              <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 tracking-tight">Your cart is empty.</h2>
            <p className="text-gray-500 mb-8 max-w-md">
              Looks like you haven't added anything to your cart yet. Start browsing to add some items to your bag.
            </p>
            <Link href="/">
              <button className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          // ================= CART CONTENT =================
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT COLUMN: ITEMS */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col md:flex-row items-start gap-6 bg-[#111] border border-gray-800 p-6 rounded-sm group hover:border-gray-600 transition-colors duration-300"
                >
                  {/* Product Image */}
                  <div className="w-full md:w-32 h-32 bg-[#0a0a0a] rounded-sm overflow-hidden flex-shrink-0 border border-gray-800 group-hover:border-gray-600 transition-colors">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between w-full">
                    <div>
                      <Link href={`/product/${item.id}`}>
                        <h3 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors tracking-tight">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
                        {item.desc || product.description || "Performance Wear"}
                      </p>
                    </div>

                    {/* Price & Remove Row */}
                    <div className="flex justify-between items-end mt-4 md:mt-0">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400">Price</span>
                        <span className="font-bold text-white">Rs {Math.round(item.price).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        {/* Quantity Display */}
                        <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-1.5 border border-gray-800 rounded-sm">
                          <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Qty</span>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        </div>

                        {/* Remove Button */}
                        <button 
                          onClick={() => remove(item)}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors font-bold uppercase tracking-wider"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT COLUMN: STICKY SUMMARY */}
            <div className="lg:col-span-4 relative h-full">
              <div className="sticky top-24 bg-[#111] border border-gray-800 rounded-sm p-6 shadow-2xl">
                <h2 className="text-lg font-black uppercase tracking-widest mb-6 pb-4 border-b border-gray-800">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white">Rs {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Shipping Estimate</span>
                    <span className="text-white">Rs {shippingCost.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4 mb-8 flex justify-between items-end">
                  <span className="text-sm font-bold uppercase tracking-wider text-gray-300">Total</span>
                  <span className="text-2xl font-black text-white tracking-tighter">
                    Rs {total.toLocaleString()}
                  </span>
                </div>

                <Link href="/checkout">
                  <button className="w-full bg-white text-black py-4 text-xs font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300 mb-4">
                    Proceed to Checkout
                  </button>
                </Link>

                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure Checkout</span>
                </div>
                
                <Link href="/" className="block text-center text-xs text-gray-600 hover:text-white mt-4 transition-colors uppercase tracking-wider">
                  Continue Shopping
                </Link>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}