import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function CollectionPage({ products = [], category, subcategory }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category && subcategory) {
      setLoading(false);
    }
  }, [category, subcategory]);

  // Use real products from API
  const scrollSectionItems = products && products.length > 0 ? products : [];

  function formatTitle(str) {
    if (!str) return '';
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const pageTitle = formatTitle(subcategory);
  const breadcrumb = `${formatTitle(category)} / ${pageTitle}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header forceSolid={true} />
      
      {/* Hero Section */}
      <div className="mt-20 bg-gray-50 border-b border-gray-200 text-gray-900 py-12">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          <nav className="text-xs mb-3 font-semibold tracking-wide text-gray-500">
            <Link href="/" className="hover:text-black">Home</Link> <span className="mx-2">/</span> <Link href={`/collections/${category}`} className="hover:text-black">{formatTitle(category)}</Link> <span className="mx-2">/</span> <span className="text-black">{pageTitle}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-2">{pageTitle}</h1>
          <p className="text-sm text-gray-600 font-light tracking-wide">
            PERFORMANCE YOU CAN FEEL.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      ) : (
        <>
          {/* ================= PRODUCT GRID SECTION ================= */}
          <section className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* LEFT SIDE: Small Compact Cards Grid (9 Cols) */}
              <div className="col-span-12 lg:col-span-9">
                {/* Grid: 4 columns on desktop for smaller cards */}
                {scrollSectionItems && scrollSectionItems.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                  {scrollSectionItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="group cursor-pointer flex flex-col"
                    >
                      {/* Image Container */}
                      <div 
                        className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-3"
                        onClick={() => (window.location.href = `/product/${item.id}`)}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        {/* Badge */}
                        {index === 0 && (
                            <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 tracking-widest uppercase">
                                New Drop
                            </div>
                        )}

                        {/* Hover Overlay Slide Up */}
                        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <button
                                onClick={(e) => {
                                e.stopPropagation();
                                if (
                                    typeof window !== "undefined" &&
                                    typeof window.__addToCart === "function"
                                )
                                    window.__addToCart(item);
                                }}
                                className="w-full bg-white text-black py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-gray-100 transition shadow-lg"
                            >
                                Quick Add +
                            </button>
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="flex flex-col flex-grow">
                        <h3 className="text-sm font-bold mb-1 leading-tight">{item.name}</h3>
                        <p className="text-[11px] text-gray-500 mb-1 uppercase tracking-wide">{item.desc}</p>
                        <span className="text-xs font-semibold mt-auto">
                          Rs {item.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                ) : (
                  <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                      <p className="text-gray-600 text-lg mb-4">No products found in this category.</p>
                      <Link href={`/collections/${category}`} className="text-black font-semibold hover:underline">
                        View all {formatTitle(category)} products
                      </Link>
                    </div>
                  </div>
                )}
                
                {scrollSectionItems && scrollSectionItems.length > 0 && (
                <div className="mt-16 flex justify-center">
                    <button className="px-12 py-3 border border-gray-900 text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition">
                        Load More
                    </button>
                </div>
                )}
              </div>

              {/* RIGHT SIDE: Sticky Sidebar (3 Cols) */}
              <div className="hidden lg:block col-span-3 relative">
                <div className="sticky top-24">
                  {/* Sticky Video Box */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-900">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover opacity-90"
                      poster="https://images.pexels.com/photos/1534126/pexels-photo-1534126.jpeg?auto=compress&cs=tinysrgb&w=800"
                    >
                      <source src="/videos/rightcoloumn.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Overlay Content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                    <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                      <h4 className="font-display font-bold text-2xl mb-2 leading-none">
                        {pageTitle.toUpperCase()}
                      </h4>
                      <div className="h-0.5 w-12 bg-white mb-4"></div>
                      <p className="text-xs text-gray-300 mb-6 leading-relaxed font-light">
                        Engineered for movement. Designed for style. The complete collection available now.
                      </p>
                      <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-white text-black px-6 py-3 text-[10px] font-bold tracking-widest hover:bg-gray-200 transition uppercase w-full"
                      >
                        Explore Collection
                      </button>
                    </div>
                  </div>

                  {/* Secondary Banner (Optional decoration below video) */}
                  <div className="mt-4 border border-gray-200 p-6 text-center">
                    <h5 className="font-bold text-xs tracking-widest uppercase mb-2">Join The Pack</h5>
                    <p className="text-[11px] text-gray-500 mb-4">Sign up for exclusive drops and 15% off your first order.</p>
                    <input type="email" placeholder="Your Email Address" className="w-full border border-gray-300 p-2 text-xs mb-2 focus:outline-none focus:border-black" />
                    <button className="w-full bg-black text-white text-xs py-2 font-bold tracking-widest uppercase hover:bg-gray-800">Subscribe</button>
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
  const paths = [
    { params: { category: 'men', subcategory: 't-shirts' } },
    { params: { category: 'men', subcategory: 'hoodies-jackets' } },
    { params: { category: 'men', subcategory: 'shorts' } },
    { params: { category: 'women', subcategory: 'leggings' } },
    { params: { category: 'women', subcategory: 'sports-bras' } },
    { params: { category: 'women', subcategory: 'jackets' } },
    { params: { category: 'accessories', subcategory: 'all-socks' } },
    { params: { category: 'accessories', subcategory: 'gym-bags' } },
  ];
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const base = process.env.API_BASE_URL || 'http://localhost:3000/api';
  try {
    const res = await fetch(`${base}/products?category=${params.category}&subcategory=${params.subcategory}`);
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) throw new Error('Non-JSON response');
    const data = await res.json();
    
    return {
      props: { 
        products: data.products || [],
        category: params.category, 
        subcategory: params.subcategory 
      },
      revalidate: 3600, // ISR: Revalidate every hour
    };
  } catch (err) {
    return {
      props: { 
        products: [],
        category: params.category, 
        subcategory: params.subcategory 
      },
      revalidate: 3600,
    };
  }
}