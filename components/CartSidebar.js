import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { cart = [], remove, clear } = useCart() || {};

  const close = () => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById('cart-sidebar');
    if (el && !el.classList.contains('translate-x-full')) el.classList.add('translate-x-full');
    const overlay = document.getElementById('cart-overlay');
    if (overlay) {
      overlay.classList.add('opacity-0');
      setTimeout(()=>overlay.classList.add('hidden'), 200);
    }
  };

  const subtotal = (cart || []).reduce((s, i) => s + (Number(i.price || 0) * (i.quantity || 1)), 0);
  const itemCount = (cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <aside className="w-[400px] bg-black text-white h-full flex flex-col shadow-2xl">
      {/* Header with gradient border */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <div className="px-6 py-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-xl tracking-tight uppercase">Shopping Cart</h3>
              <p className="text-xs text-gray-400 mt-1 font-medium tracking-wide">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your bag</p>
            </div>
            <button 
              aria-label="close cart" 
              onClick={close} 
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
        {(!cart || cart.length === 0) ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm font-semibold">Your cart is empty</p>
            <p className="text-gray-600 text-xs mt-2">Add some products to get started</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {cart.map((item, idx) => (
              <li key={item.id + '-' + idx} className="group relative bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-900 rounded-md overflow-hidden flex-shrink-0 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-white mb-1 truncate group-hover:text-gray-100 transition-colors">{item.name}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      {item.size && (
                        <span className="text-[10px] px-2 py-0.5 bg-white/10 rounded-full text-gray-300 font-semibold uppercase tracking-wider">
                          {item.size}
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 bg-white/10 rounded-full text-gray-300 font-semibold">
                        Qty: {item.quantity || 1}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-base font-black text-white">Rs {Math.round((item.price||0) * (item.quantity||1)).toLocaleString()}</p>
                      <button 
                        onClick={() => remove(item)} 
                        className="text-[10px] text-red-400 hover:text-red-300 font-semibold uppercase tracking-wider transition-colors flex items-center gap-1 group/btn"
                      >
                        <svg className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer with Checkout */}
      <div className="border-t border-gray-800 bg-gradient-to-b from-black to-gray-950 px-6 py-6">
        {/* Shipping Info */}
        {cart.length > 0 && (
          <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Free shipping on orders over Rs 5,000</span>
            </div>
          </div>
        )}

        {/* Subtotal */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Subtotal</p>
            <p className="text-2xl font-black text-white tracking-tight">Rs {Math.round(subtotal).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Shipping</p>
            <p className="text-xs text-gray-400 font-semibold">Calculated at checkout</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => { if (cart.length) window.location.href = '/checkout'; }} 
            disabled={cart.length === 0}
            className="w-full bg-white text-black px-6 py-4 text-sm font-black uppercase tracking-widest hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 rounded-lg shadow-lg hover:shadow-xl"
          >
            Proceed to Checkout
          </button>
          
          {cart.length > 0 && (
            <button 
              onClick={() => clear()} 
              className="w-full border-2 border-white/20 text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-white/10 hover:border-white/30 transition-all duration-300 rounded-lg"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </aside>
  );
}
