import Link from 'next/link';

export default function ProductCard({ product }) {
  
  // Handle Cart Logic with Fallbacks & Event Dispatching
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click (link navigation)

    if (typeof window !== 'undefined') {
      // 1. Try Global Context Function
      if (typeof window.__addToCart === 'function') {
        window.__addToCart(product);
      } else {
        // 2. Fallback: LocalStorage Direct Logic
        try {
          const raw = localStorage.getItem('cart');
          const cart = raw ? JSON.parse(raw) : [];
          const exists = cart.find((i) => i.id === product.id);
          
          if (exists) {
            exists.quantity = (exists.quantity || 0) + 1;
          } else {
            cart.push({ ...product, quantity: 1 });
          }
          
          localStorage.setItem('cart', JSON.stringify(cart));
        } catch (err) {
          console.error("Cart Error", err);
        }
      }

      // 3. Trigger Event to update Header Badge immediately
      window.dispatchEvent(new Event('cart-changed'));
      window.dispatchEvent(new Event('storage'));
    }
  };

  return (
    <div className="group relative bg-[#111] border border-gray-800 rounded-sm overflow-hidden transition-all duration-300 hover:border-gray-600 hover:shadow-2xl hover:shadow-black">
      
      {/* ================= IMAGE CONTAINER ================= */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-900 shine-effect cursor-pointer">
        
        {/* The Image */}
        {/* Wrapped in Link to make clicking the image go to product page */}
        <Link href={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null; 
              // Fallback to a high-quality placeholder if image fails
              e.target.src = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80";
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          />
        </Link>

        {/* Tag (e.g., NEW, SALE) */}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-white text-black text-[9px] font-bold tracking-widest uppercase px-2 py-1 z-20 shadow-lg">
            {product.tag}
          </span>
        )}

        {/* ================= SLIDE UP OVERLAY ================= */}
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          {/* The "Add to Cart" Button */}
          <button
            onClick={handleAddToCart}
            className="relative w-full bg-white text-black text-xs font-bold uppercase tracking-widest py-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hover:bg-red-600 hover:text-white active:scale-95 z-30 flex items-center justify-center gap-2"
          >
            <span>Add To Bag</span>
            <span className="text-[10px]">+</span>
          </button>
        </div>
      </div>

      {/* ================= INFO SECTION ================= */}
      <div className="p-5 flex flex-col gap-1 relative z-10 bg-[#111]">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-bold text-sm text-gray-200 group-hover:text-white transition-colors duration-200 truncate tracking-tight">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500 line-clamp-1 group-hover:text-gray-400 transition-colors">
            {product.desc || product.description || "Performance Wear"}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-medium text-white">
              Rs {Math.round(product.price || 0).toLocaleString()}
            </span>
            <span className="text-[10px] text-gray-600 uppercase tracking-widest border-b border-gray-700 pb-0.5">
              Details &rarr;
            </span>
          </div>
        </Link>
      </div>

      {/* ================= CSS ANIMATIONS ================= */}
      <style jsx global>{`
        @keyframes shine {
          100% { left: 125%; }
        }
        
        /* The Shine Effect Class */
        .group:hover .shine-effect::after {
          animation: shine 0.85s;
        }
        
        .shine-effect {
          position: relative;
          overflow: hidden;
        }
        
        .shine-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 75%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}