import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function CategoryPage({ products = [], category }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setLoading(false);
    }
  }, [category]);

  // Use real products from API
  const scrollSectionItems = products && products.length > 0 ? products : [];

  function formatTitle(str) {
    if (!str) return '';
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const pageTitle = formatTitle(category);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505]">
      <Header forceSolid={true} />
      
      {/* Hero Section - Dark Modern */}
      <div className="pt-24 pb-16 bg-gradient-to-b from-black via-[#0a0a0a] to-[#050505] border-b border-gray-900">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          <nav className="text-xs mb-6 font-bold tracking-widest text-gray-600 uppercase">
            <a href="/" className="hover:text-white transition-colors">Home</a> 
            <span className="mx-3 text-gray-800">/</span> 
            <span className="text-white">{pageTitle}</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white uppercase">
            {pageTitle}
          </h1>
          <p className="text-sm text-gray-400 font-semibold tracking-[0.2em] uppercase">
            Performance You Can Feel.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading {pageTitle.toLowerCase()}...</p>
          </div>
        </div>
      ) : (
        <>
          {/* ================= PRODUCT GRID SECTION ================= */}
          <section className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* LEFT SIDE: Larger Cards Grid (3 Cols) */}
              <div className="col-span-12 lg:col-span-9">
                {/* Changed from lg:grid-cols-4 to lg:grid-cols-3 for larger cards */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                  {scrollSectionItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="group product-card relative cursor-pointer transform transition-all duration-500 hover:-translate-y-2"
                      onClick={() => (window.location.href = `/product/${item.id}`)}
                    >
                      {/* Image Container */}
                      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-black/60 to-black/40 mb-4 rounded-lg border border-white/10 group-hover:border-white/40 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-500">
                        {/* Shimmer Effect on Hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                        
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2 group-hover:brightness-110"
                        />
                        
                        {/* Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Badge */}
                        {index === 0 && (
                            <div className="absolute top-4 left-4 bg-white text-black text-[9px] font-black px-3 py-1.5 tracking-[0.2em] uppercase rounded-sm shadow-2xl animate-pulse">
                                New Drop
                            </div>
                        )}

                        {/* Hover Overlay Slide Up Button */}
                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out">
                            <button
                                onClick={(e) => {
                                e.stopPropagation();
                                if (
                                    typeof window !== "undefined" &&
                                    typeof window.__addToCart === "function"
                                )
                                    window.__addToCart(item);
                                }}
                                className="w-full bg-white text-black py-3.5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 shadow-2xl transform hover:scale-110 active:scale-95 border-2 border-white relative overflow-hidden group/btn"
                            >
                                <span className="relative z-10">Quick Add</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                            </button>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="px-1">
                        <h4 className="font-black text-sm mb-2 leading-tight text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 group-hover:bg-clip-text transition-all duration-300 tracking-wide">{item.name}</h4>
                        <p className="text-xs text-gray-500 mb-2 group-hover:text-gray-400 transition-colors">
                          {item.desc}
                        </p>
                        <span className="text-sm font-black text-gray-400 group-hover:text-white transition-colors duration-300">
                          Rs {item.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination / Load More */}
                <div className="mt-16 flex justify-center">
                    <button className="relative px-16 py-5 bg-white text-black border-2 border-white text-xs font-black tracking-[0.25em] uppercase overflow-hidden group/load transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transform hover:scale-105">
                        <span className="relative z-10 group-hover/load:text-white transition-colors duration-300">Load More</span>
                        <div className="absolute inset-0 bg-black transform scale-x-0 group-hover/load:scale-x-100 transition-transform duration-500 origin-left"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/load:translate-x-full transition-transform duration-1000"></div>
                    </button>
                </div>
              </div>

              {/* RIGHT SIDE: Sticky Sidebar (3 Cols) */}
              <div className="hidden lg:block col-span-3 relative">
                <div className="sticky top-24">
                  {/* Sticky Video Box */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-black rounded-lg border border-white/10">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover opacity-80"
                      poster="https://images.pexels.com/photos/1534126/pexels-photo-1534126.jpeg?auto=compress&cs=tinysrgb&w=800"
                    >
                      <source src="/videos/rightcoloumn.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Overlay Content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                      <h4 className="font-black text-2xl mb-3 leading-none uppercase tracking-tight">
                        {pageTitle.toUpperCase()}
                      </h4>
                      <div className="h-0.5 w-12 bg-white mb-4"></div>
                      <p className="text-xs text-gray-300 mb-6 leading-relaxed font-light">
                        Engineered for movement. Designed for style. The complete collection available now.
                      </p>
                      <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-white text-black px-6 py-3 text-[10px] font-black tracking-[0.2em] hover:bg-gray-100 transition-all uppercase w-full"
                      >
                        Explore Collection
                      </button>
                    </div>
                  </div>

                  {/* Secondary Banner */}
                  <div className="mt-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                    <h5 className="font-black text-xs tracking-[0.2em] uppercase mb-3 text-white">Join The Pack</h5>
                    <p className="text-[11px] text-gray-400 mb-4 font-semibold">Sign up for exclusive drops and 15% off your first order.</p>
                    <input type="email" placeholder="Your Email Address" className="w-full bg-white/10 border border-white/20 p-3 text-xs mb-3 focus:outline-none focus:border-white text-white placeholder-gray-500 rounded" />
                    <button className="w-full bg-white text-black text-xs py-3 font-black tracking-[0.2em] uppercase hover:bg-gray-100 transition-all">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* ================= END PRODUCT GRID ================= */}
        </>
      )}

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const categories = ['men', 'women', 'accessories', 'new-in'];
  return {
    paths: categories.map(cat => ({ params: { category: cat } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const base = process.env.API_BASE_URL || 'http://localhost:3000/api';
  try {
    const res = await fetch(`${base}/products?category=${params.category}`);
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) throw new Error('Non-JSON response');
    const data = await res.json();
    
    return {
      props: { 
        products: data.products || [],
        category: params.category 
      },
      revalidate: 3600, // ISR: Revalidate every hour
    };
  } catch (err) {
    return {
      props: { 
        products: [],
        category: params.category 
      },
      revalidate: 3600,
    };
  }
}