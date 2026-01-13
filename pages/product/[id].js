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
    <div className="min-h-screen bg-white">
      <Header forceSolid={true} />
      
      {/* Breadcrumb Navigation */}
      <nav className="max-w-6xl mx-auto px-4 mt-[80px] lg:px-8 py-6 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <button
            onClick={() => window.history.back()}
            className="hover:text-black transition flex items-center gap-1"
          >
            <i className="fas fa-chevron-left"></i>
            <span>Back</span>
          </button>
          <span className="text-gray-300">/</span>
          <Link href="/" className="hover:text-black transition">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">{product.name}</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column: Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100">
            <img 
              src={productImages[selectedImage]} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {productImages.map((src, idx) => (
              <div 
                key={idx} 
                className={`aspect-[3/4] overflow-hidden rounded bg-gray-100 cursor-pointer border-2 ${selectedImage === idx ? 'border-black' : 'border-transparent'}`}
                onClick={() => setSelectedImage(idx)}
              >
                <img 
                  src={src} 
                  alt={`${product.name} ${idx + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform" 
                />
              </div>
            ))}
          </div>

          {/* Accordion Sections */}
          <div className="mt-12 space-y-0 border-t border-gray-200">
            {['SHIPPING & RETURNS', 'FEATURES & FIT', 'FABRIC & CARE', 'PURPOSE', 'REVIEWS'].map((section) => (
              <div key={section} className="border-b border-gray-200">
                <button
                  onClick={() => setExpandedSection(expandedSection === section ? null : section)}
                  className="w-full py-4 text-left text-sm font-bold tracking-widest uppercase flex justify-between items-center hover:bg-gray-50"
                >
                  <span>{section}</span>
                  <i className={`fas fa-chevron-down transition-transform ${expandedSection === section ? 'rotate-180' : ''}`}></i>
                </button>
                {expandedSection === section && (
                  <div className="px-0 pb-4 text-sm text-gray-600 space-y-2">
                    {section === 'SHIPPING & RETURNS' && <p>Free shipping on orders over Rs 15,000. Easy 30-day returns.</p>}
                    {section === 'FEATURES & FIT' && <p>Premium fit with moisture-wicking technology. Regular fit through torso and sleeves.</p>}
                    {section === 'FABRIC & CARE' && <p>92% Polyester, 8% Spandex. Machine wash cold. Do not bleach.</p>}
                    {section === 'PURPOSE' && <p>Designed for high-performance training, gym sessions, and everyday wear.</p>}
                    {section === 'REVIEWS' && <p>⭐⭐⭐⭐⭐ Highly rated by customers. Comfortable and durable.</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Details & Video */}
        <div>
          <p className="text-xs tracking-[0.2em] text-gray-500 mb-2 uppercase">Performance</p>
          <h1 className="text-3xl font-bold tracking-tight mb-3">{product.name}</h1>
          <p className="text-lg text-gray-500 mb-6">{product.description || 'Premium performance apparel'}</p>
          <div className="text-2xl font-semibold mb-6">Rs {Math.round(product.price || 0).toLocaleString()}</div>

          {/* Sizes */}
          <div className="mb-6">
            <div className="text-sm font-semibold mb-2">Select Size</div>
            <div className="grid grid-cols-5 gap-2 max-w-xs">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-2 text-sm font-semibold tracking-wide ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-gray-800 hover:border-black'}`}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Size guide</p>
          </div>

          {/* Add to cart */}
          <div className="flex flex-col gap-3 mb-8">
            <button onClick={handleAddToCart} className="bg-black text-white w-full py-3 font-bold uppercase tracking-widest hover:bg-gray-900">
              Add to Cart
            </button>
            <button className="border border-gray-300 text-gray-800 w-full py-3 font-semibold hover:border-black">
              Buy Now
            </button>
          </div>

          {/* Product Video */}
          {product.video && (
            <div className="mt-8 rounded-lg overflow-hidden bg-gray-100 aspect-video">
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

      {/* Shop The Look Section */}
      <section className="bg-gray-50 py-16 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-8 uppercase">Shop The Look</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`}>
                <div className="bg-white rounded-lg overflow-hidden relative group cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    {item.tag && <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1">{item.tag}</div>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2">{item.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Rs {Math.round(item.price).toLocaleString()}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (typeof window !== 'undefined' && typeof window.__addToCart === 'function') {
                            window.__addToCart(item);
                          }
                        }}
                        className="text-xs border border-gray-300 px-3 py-1 hover:border-black"
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
