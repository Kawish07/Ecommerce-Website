import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      setLoading(false);
    }
  }, [category]);

  // Dummy products for the grid
  const scrollSectionItems = [
    {
      id: 201,
      name: "Elite Performance Tee",
      price: 4500,
      image: "https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "Ultimate comfort fit",
    },
    {
      id: 202,
      name: "Pro Training Shorts",
      price: 3800,
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "4-way stretch fabric",
    },
    {
      id: 203,
      name: "Premium Hoodie",
      price: 7200,
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "Cotton blend comfort",
    },
    {
      id: 204,
      name: "Athletic Joggers",
      price: 5000,
      image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "Breathable fabric",
    },
    {
      id: 205,
      name: "Compression Leggings",
      price: 4800,
      image: "https://images.pexels.com/photos/4498610/pexels-photo-4498610.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "High waist design",
    },
    {
      id: 206,
      name: "Performance Tank",
      price: 3200,
      image: "https://images.pexels.com/photos/4498182/pexels-photo-4498182.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "Moisture wicking",
    },
    {
      id: 207,
      name: "Gym Duffle Bag",
      price: 6500,
      image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "Durable & spacious",
    },
    {
      id: 208,
      name: "Stringer Vest",
      price: 3500,
      image: "https://images.pexels.com/photos/5412168/pexels-photo-5412168.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "Gold's gym classic",
    },
    {
      id: 209,
      name: "Seamless Set",
      price: 12500,
      image: "https://images.pexels.com/photos/4462782/pexels-photo-4462782.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "Matching bundle",
    },
    {
      id: 210,
      name: "Training Cap",
      price: 2500,
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "Adjustable fit",
    },
    {
      id: 211,
      name: "Sports Bra",
      price: 3200,
      image: "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "High impact",
    },
    {
      id: 212,
      name: "Long Sleeve Tee",
      price: 4800,
      image: "https://images.pexels.com/photos/8350438/pexels-photo-8350438.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "Thermal tech",
    },
  ];

  function formatTitle(str) {
    if (!str) return '';
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const pageTitle = formatTitle(category);

  return (
    <div className="min-h-screen flex flex-col">
      <Header forceSolid={true} />
      
      {/* Hero Section */}
      <div className="mt-20 bg-gray-50 border-b border-gray-200 text-gray-900 py-12">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          <nav className="text-xs mb-3 font-semibold tracking-wide text-gray-500">
            <a href="/" className="hover:text-black">Home</a> <span className="mx-2">/</span> <span className="text-black">{pageTitle}</span>
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
            <p className="mt-4 text-gray-600">Loading {pageTitle.toLowerCase()}...</p>
          </div>
        </div>
      ) : (
        <>
          {/* ================= PRODUCT GRID SECTION ================= */}
          <section className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* LEFT SIDE: Larger Cards Grid (3 Cols) */}
              <div className="col-span-12 lg:col-span-9">
                {/* Changed from lg:grid-cols-4 to lg:grid-cols-3 for larger cards */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                  {scrollSectionItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="group product-card relative cursor-pointer"
                      onClick={() => (window.location.href = `/product/${item.id}`)}
                    >
                      {/* Image Container */}
                      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        
                        {/* Badge */}
                        {index === 0 && (
                            <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 tracking-widest uppercase">
                                New Drop
                            </div>
                        )}

                        {/* Hover Overlay Slide Up Button */}
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
                                className="w-full bg-white text-black border border-gray-200 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition shadow-lg"
                            >
                                Quick Add
                            </button>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div>
                        <h4 className="font-bold text-sm mb-1 leading-tight">{item.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">
                          {item.desc}
                        </p>
                        <span className="text-sm font-semibold">
                          Rs {item.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination / Load More */}
                <div className="mt-16 flex justify-center">
                    <button className="px-12 py-3 border border-gray-900 text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition">
                        Load More
                    </button>
                </div>
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

                  {/* Secondary Banner */}
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
  const categories = ['men', 'women', 'accessories', 'new-in'];
  return {
    paths: categories.map(cat => ({ params: { category: cat } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  return {
    props: { category: params.category },
    revalidate: 3600, // ISR: Revalidate every hour
  };
}