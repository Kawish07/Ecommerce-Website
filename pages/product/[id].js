import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ProductPage({ product, relatedProducts = [] }) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  // Get product images (use the images array if available, otherwise use main image)
  const productImages = product?.images && product.images.length > 0 
    ? product.images 
    : product?.image 
      ? [product.image] 
      : ['https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=800'];

  if (!product) {
    return (
      <div>
        <Header />
        <main className="p-8">Product not found</main>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (typeof window !== 'undefined') {
      const item = { ...product, size: selectedSize };
      if (typeof window.__addToCart === 'function') {
        window.__addToCart(item);
      } else {
        const raw = localStorage.getItem('cart');
        const cart = raw ? JSON.parse(raw) : [];
        const existing = cart.find((i) => i.id === item.id && i.size === item.size);
        if (existing) existing.quantity = (existing.quantity || 1) + 1; else cart.push({ ...item, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-changed'));
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <Header forceSolid={true} />
      
      {/* Breadcrumb Navigation - Dark Theme */}
      <nav className="max-w-6xl mx-auto px-4 pt-24 lg:px-8 pb-6 text-sm">
        <div className="flex items-center gap-3 text-gray-500">
          <button
            onClick={() => window.history.back()}
            className="hover:text-white transition-all duration-300 flex items-center gap-2 group font-semibold tracking-wider"
          >
            <i className="fas fa-chevron-left group-hover:-translate-x-1 transition-transform"></i>
            <span>Back</span>
          </button>
          <span className="text-gray-700">/</span>
          <Link href="/" className="hover:text-white transition-colors duration-300 font-semibold">Home</Link>
          <span className="text-gray-700">/</span>
          <span className="text-white font-black">{product.name}</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Gallery - Enhanced Dark */}
        <div className="space-y-4">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-black/40 border border-white/10 group relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
              src={productImages[selectedImage]} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {productImages.map((src, idx) => (
              <div 
                key={idx} 
                className={`aspect-[3/4] overflow-hidden rounded-lg bg-black/40 cursor-pointer border-2 transition-all duration-300 ${
                  selectedImage === idx 
                    ? 'border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                    : 'border-white/10 hover:border-white/40'
                }`}
                onClick={() => setSelectedImage(idx)}
              >
                <img 
                  src={src} 
                  alt={`${product.name} ${idx + 1}`} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                />
              </div>
            ))}
          </div>

          {/* Accordion Sections - Dark Theme */}
          <div className="mt-12 space-y-0 border-t border-white/10">
            {['SHIPPING & RETURNS', 'FEATURES & FIT', 'FABRIC & CARE', 'PURPOSE', 'REVIEWS'].map((section) => (
              <div key={section} className="border-b border-white/10">
                <button
                  onClick={() => setExpandedSection(expandedSection === section ? null : section)}
                  className="w-full py-5 text-left text-xs font-black tracking-[0.25em] uppercase flex justify-between items-center hover:bg-white/5 transition-colors duration-300 text-white group"
                >
                  <span className="group-hover:text-gray-300 transition-colors">{section}</span>
                  <i className={`fas fa-chevron-down transition-all duration-300 ${expandedSection === section ? 'rotate-180 text-white' : 'text-gray-500 group-hover:text-gray-300'}`}></i>
                </button>
                {expandedSection === section && (
                  <div className="px-4 pb-5 text-sm text-gray-400 space-y-2 bg-white/5 rounded-b-lg">
                    {section === 'SHIPPING & RETURNS' && <p className="leading-relaxed">Free shipping on orders over Rs 15,000. Easy 30-day returns.</p>}
                    {section === 'FEATURES & FIT' && <p className="leading-relaxed">Premium fit with moisture-wicking technology. Regular fit through torso and sleeves.</p>}
                    {section === 'FABRIC & CARE' && <p className="leading-relaxed">92% Polyester, 8% Spandex. Machine wash cold. Do not bleach.</p>}
                    {section === 'PURPOSE' && <p className="leading-relaxed">Designed for high-performance training, gym sessions, and everyday wear.</p>}
                    {section === 'REVIEWS' && <p className="leading-relaxed">⭐⭐⭐⭐⭐ Highly rated by customers. Comfortable and durable.</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Details & Video - Dark Theme */}
        <div>
          <p className="text-[10px] tracking-[0.3em] text-gray-500 mb-3 uppercase font-black">Performance</p>
          <h1 className="text-4xl font-black tracking-tight mb-4 text-white">{product.name}</h1>
          <p className="text-base text-gray-400 mb-6 leading-relaxed">{product.description || 'Premium performance apparel'}</p>
          <div className="text-3xl font-black mb-8 text-white">Rs {Math.round(product.price || 0).toLocaleString()}</div>

          {/* Sizes - Enhanced */}
          <div className="mb-8">
            <div className="text-sm font-black mb-3 text-white tracking-wider">Select Size</div>
            <div className="grid grid-cols-5 gap-3 max-w-xs">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border-2 py-3 text-sm font-black tracking-wide transition-all duration-300 ${
                    selectedSize === size 
                      ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-110' 
                      : 'bg-transparent text-white border-white/20 hover:border-white hover:bg-white/10'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3 hover:text-gray-400 cursor-pointer transition-colors">Size guide →</p>
          </div>

          {/* Add to cart - Enhanced */}
          <div className="flex flex-col gap-4 mb-10">
            <button 
              onClick={handleAddToCart} 
              className="relative bg-white text-black w-full py-4 font-black uppercase tracking-[0.25em] text-sm overflow-hidden group transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transform hover:scale-105"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Add to Cart</span>
              <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            <button className="border-2 border-white/30 text-white w-full py-4 font-black uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-black transition-all duration-300">
              Buy Now
            </button>
          </div>

          {/* Product Video - Enhanced */}
          {product.video && (
            <div className="mt-8 rounded-lg overflow-hidden bg-black border border-white/10 aspect-video relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                poster={product.image}
              >
                <source src={product.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </main>

      {/* Shop The Look Section - Dark Theme */}
      <section className="bg-gradient-to-b from-[#050505] to-black py-20 px-4 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black tracking-tight mb-10 uppercase text-white">Shop The Look</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`}>
                <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-white/30 relative group cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transform hover:-translate-y-2">
                  <div className="aspect-[3/4] overflow-hidden bg-black/40 relative">
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700" />
                    {item.tag && <div className="absolute top-4 left-4 bg-white text-black text-xs font-black px-3 py-2 uppercase tracking-wider rounded-sm shadow-xl z-20">{item.tag}</div>}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 bg-white/5">
                    <h3 className="font-black text-sm mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 group-hover:bg-clip-text transition-all duration-300">{item.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-black text-gray-400 group-hover:text-white transition-colors">Rs {Math.round(item.price).toLocaleString()}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (typeof window !== 'undefined' && typeof window.__addToCart === 'function') {
                            window.__addToCart(item);
                          }
                        }}
                        className="text-xs border-2 border-white/30 text-white px-4 py-2 hover:bg-white hover:text-black font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-110"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const base = process.env.API_BASE_URL || 'http://localhost:3000/api';
  const fallbackProducts = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ];

  try {
    const res = await fetch(`${base}/products`);
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) throw new Error('Non-JSON response');
    const data = await res.json();
    const paths = (data.products || []).map((p) => ({ params: { id: String(p.id) } }));
    return { paths, fallback: 'blocking' };
  } catch (err) {
    const paths = fallbackProducts.map((p) => ({ params: { id: String(p.id) } }));
    return { paths, fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  const base = process.env.API_BASE_URL || 'http://localhost:3000/api';
  try {
    const res = await fetch(`${base}/products`);
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) throw new Error('Non-JSON response');
    const data = await res.json();
    const found = (data.products || []).find((x) => String(x.id) === String(params.id));

    const fallbackProduct = {
      id: params.id,
      name: `Performance Piece #${params.id}`,
      price: 4999,
      image: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Premium performance wear crafted for training and lifestyle.',
    };

    const product = found || fallbackProduct;
    
    // Get related products from the same category/subcategory, excluding current product
    let relatedProducts = [];
    if (product.category && product.subcategory) {
      relatedProducts = (data.products || []).filter(
        (p) => p.category === product.category && 
               p.subcategory === product.subcategory && 
               String(p.id) !== String(params.id)
      ).slice(0, 4); // Get up to 4 related products
    }
    
    // If no related products in same subcategory, get from same category
    if (relatedProducts.length === 0 && product.category) {
      relatedProducts = (data.products || []).filter(
        (p) => p.category === product.category && 
               String(p.id) !== String(params.id)
      ).slice(0, 4);
    }
    
    // If still no related products, get any products
    if (relatedProducts.length === 0) {
      relatedProducts = (data.products || []).filter(
        (p) => String(p.id) !== String(params.id)
      ).slice(0, 4);
    }

    return { 
      props: { 
        product,
        relatedProducts 
      },
      revalidate: 3600 // ISR: Revalidate every hour
    };
  } catch (err) {
    const fallbackProduct = {
      id: params.id,
      name: `Performance Piece #${params.id}`,
      price: 4999,
      image: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Premium performance wear crafted for training and lifestyle.',
    };
    return { 
      props: { 
        product: fallbackProduct,
        relatedProducts: []
      },
      revalidate: 3600 // ISR: Revalidate every hour
    };
  }
}
