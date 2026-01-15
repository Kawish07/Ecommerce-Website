import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";

export default function HomePage({ products = [] }) {
  const router = useRouter();

  // Fixed & Curated High-Quality Images (Unsplash)
  const scrollSectionItems = products.slice(0, 6).length > 0 
    ? products.slice(0, 6) 
    : [
      {
        id: 101,
        name: "Core Performance Tee",
        price: 4500,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        desc: "Sweat-wicking, second-skin feel.",
      },
      {
        id: 102,
        name: "Velocity Runner Shorts",
        price: 3800,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
        desc: "Lightweight, 4-way stretch.",
      },
      {
        id: 103,
        name: "Obsidian Hoodie",
        price: 12000,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
        desc: "Premium thermal fleece.",
      },
      {
        id: 104,
        name: "Apex Tech Vest",
        price: 15000,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        desc: "Breathable mesh construction.",
      },
      {
        id: 105,
        name: "Power Compression",
        price: 9500,
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
        desc: "Supportive sculpting fit.",
      },
      {
        id: 106,
        name: "Circuit Sleeveless",
        price: 5000,
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
        desc: "Maximum range of motion.",
      },
    ];

  const newArrivals = products.length > 0
    ? products.slice(0, 8)
    : [
        { id: 201, name: "AeroLite Runner", price: 5400, image: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=800&q=80", desc: "Featherweight performance" },
        { id: 202, name: "Flex Motion Joggers", price: 8800, image: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&w=800&q=80", desc: "Unrestricted movement" },
        { id: 203, name: "Seamless Sculpt Set", price: 14200, image: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&w=800&q=80", desc: "Zero seam technology" },
        { id: 204, name: "Speed Track Shorts", price: 6200, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80", desc: "Race ready fit" },
        { id: 205, name: "Urban Oversized Tee", price: 13200, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80", desc: "Streetwear aesthetic" },
        { id: 206, name: "High-Impact Sports Bra", price: 4100, image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80", desc: "Maximum support" },
        { id: 207, name: "Flex Leggings 2.0", price: 11500, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80", desc: "Butter soft fabric" },
        { id: 208, name: "Core Training Tee", price: 4800, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80", desc: "Everyday essential" },
      ];

  useEffect(() => {
    // Cart Context Init
    if (typeof window !== "undefined" && window.__addToCart == null) {}
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      <Header />

      {/* GLOBAL STYLES FOR SMASHING ANIMATIONS */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; }
        
        @keyframes shine {
          100% { left: 125%; }
        }
        
        /* The Shine Effect for Cards */
        .group:hover .shine-effect::after {
          animation: shine 0.75s;
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

        .hide-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ================= HERO SECTION ================= */}
      <header id="hero" className="relative w-full h-screen flex items-end overflow-hidden bg-black">
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 w-full h-full opacity-50">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-105"
            src={"/videos/a7bdbf1a11b74d67a8458976e2d39a53.mp4"}
          />
        </div>
        
        {/* Vignette & Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-transparent"></div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-16 pb-24 lg:pb-32">
          <div className="max-w-5xl">
            <span className="inline-block px-4 py-2 mb-1 text-[11px] font-bold tracking-[0.3em] uppercase border border-white/20 bg-white/5 text-gray-300 backdrop-blur-sm animate-fade-up">
              New Season Drop
            </span>
            <h2 className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter uppercase mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Reset.<br />
              Restart.<br />
              Refocus.
            </h2>
            <div className="flex flex-wrap gap-5 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Link href="/collections/men">
                <button className="bg-white text-black px-12 py-4 text-sm font-bold tracking-widest uppercase hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                  Shop Men
                </button>
              </Link>
              <Link href="/collections/women">
                <button className="bg-transparent text-white border border-white px-12 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
                  Shop Women
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-grow">
        
        {/* ================= STICKY SCROLL (The "Glass Reveal" Effect) ================= */}
        <section className="w-full max-w-[1600px] mx-auto mt-16 mb-32 px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
            
            {/* LEFT: High-Impact Cards */}
            <div className="flex flex-col gap-1 bg-black relative z-20">
              {scrollSectionItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative w-full aspect-[4/5] lg:h-[580px] group overflow-hidden cursor-pointer"
                  onClick={() => router.push(`/product/${item.id}`)}
                >
                  {/* High Quality Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                  />

                  {/* Dark Glassmorphism Overlay (Slides Up) */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center p-6 lg:p-12 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      <span className="inline-block bg-red-600 text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 mb-4">
                        New Drop
                      </span>
                    </div>

                    <h3 className="text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-none mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {item.name}
                    </h3>
                    
                    <p className="text-sm text-gray-300 mb-6 max-w-sm mx-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                      {item.desc}
                    </p>

                    <div className="flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                      <span className="text-lg font-bold">Rs {item.price.toLocaleString()}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (typeof window !== "undefined" && typeof window.__addToCart === "function")
                            window.__addToCart(item);
                        }}
                        className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors duration-300"
                      >
                        Add To Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: Sticky Video */}
            <div className="hidden lg:block h-screen sticky top-0 overflow-hidden w-full">
              <div className="w-full h-full relative">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-70 scale-105"
                  poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
                >
                   {/* High Quality Gym Video */}
                  <source src="https://videos.pexels.com/video-files/5319764/5319764-hd_1920_1080_25fps.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>

                <div className="absolute bottom-0 left-0 w-full p-12 lg:p-20">
                  <div className="max-w-lg border-l-4 border-red-600 pl-10">
                    <h3 className="font-display font-black text-5xl lg:text-7xl mb-6 leading-none tracking-tighter uppercase italic text-white">
                      Level Up
                    </h3>
                    <p className="text-gray-300 mb-10 text-base font-light tracking-wide leading-relaxed">
                      Engineered for those who never settle. The new collection defines the absolute future of performance wear.
                    </p>
                    <Link href="/collections">
                      <button className="group flex items-center gap-3 text-white font-bold text-xs tracking-[0.15em] uppercase hover:text-red-500 transition-colors">
                        Explore Collection 
                        <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-xl">→</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= POPULAR CATEGORIES (Dark & Edgy) ================= */}
        <section className="py-24 px-6 lg:px-16 max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-12 border-b border-gray-800 pb-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter uppercase">
              Shop Category
            </h2>
            <div className="h-px bg-gray-800 flex-1 ml-12 mb-3"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[700px]">
            {/* Large Feature */}
            <div className="relative h-[300px] lg:h-full overflow-hidden group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
                alt="Training"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              <div className="absolute bottom-8 left-8">
                <span className="text-white font-black text-3xl tracking-tighter uppercase group-hover:text-red-500 transition-colors">Performance</span>
              </div>
            </div>

            {/* Split Cards */}
            <div className="flex flex-col h-full gap-8">
              
              {/* Sale Card */}
              <div className="relative flex-1 bg-[#111] text-white overflow-hidden group border border-gray-800 hover:border-red-600 transition-all duration-500">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
                <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-red-600 mb-8 flex items-center justify-center">
                      <span className="text-xs font-bold">%</span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter uppercase">Best of Sale</h3>
                  </div>
                  <div>
                    <div className="text-6xl font-display font-black mb-8 italic leading-none text-gray-700 group-hover:text-gray-500 transition-colors">UP TO 50%</div>
                    <div className="flex gap-6">
                      <Link href="/collections/men">
                        <button className="px-6 py-3 text-xs font-bold tracking-[0.15em] border-b-2 border-transparent hover:border-white transition-all hover:text-gray-300">MEN</button>
                      </Link>
                      <Link href="/collections/women">
                        <button className="px-6 py-3 text-xs font-bold tracking-[0.15em] border-b-2 border-transparent hover:border-white transition-all hover:text-gray-300">WOMEN</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* T-Shirt Card */}
              <div className="relative flex-1 bg-gray-200 text-black overflow-hidden group">
                <div className="absolute inset-0 opacity-5">
                  <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover grayscale" />
                </div>
                <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h3 className="text-3xl font-black tracking-tighter uppercase">T-Shirts</h3>
                    <span className="text-xs font-bold bg-black text-white px-3 py-1 rounded-sm uppercase tracking-widest">Popular</span>
                  </div>
                  <div className="flex gap-6">
                     <Link href="/collections/men">
                      <button className="bg-black text-white px-8 py-3 text-xs font-bold tracking-[0.15em] hover:bg-red-600 transition-colors uppercase w-32">Shop Men</button>
                    </Link>
                    <Link href="/collections/women">
                      <button className="bg-transparent text-black border border-black px-8 py-3 text-xs font-bold tracking-[0.15em] hover:bg-black hover:text-white transition-colors uppercase w-32">Shop Women</button>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= PRODUCT GRID (Smashing Cards with Shine) ================= */}
        <section className="py-24 px-6 lg:px-16 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tighter uppercase">
              Men's Picks
            </h3>
            <Link href="/collections/men">
              <button className="text-xs font-bold tracking-[0.2em] uppercase border-b border-transparent hover:border-white transition-all text-gray-400 hover:text-white">
                View All Products &rarr;
              </button>
            </Link>
          </div>

          <div id="picks-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products
              .filter((p) => p.gender === "men" || !p.gender)
              .slice(0, 4)
              .map((p) => (
                <div
                  key={p.id}
                  className="group cursor-pointer"
                  onClick={() => (window.location.href = `/product/${p.id}`)}
                >
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#111] mb-5 shine-effect rounded-sm">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Tag */}
                    {p.tag && <span className="absolute top-4 left-4 bg-white text-black text-[10px] font-bold tracking-widest uppercase px-2 py-1 z-20">{p.tag}</span>}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]"></div>
                    
                    {/* Floating Add Button (Slide Up) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (typeof window !== "undefined" && typeof window.__addToCart === "function")
                          window.__addToCart(p);
                      }}
                      className="absolute bottom-0 left-0 right-0 bg-white text-black text-xs font-bold uppercase tracking-widest py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10 hover:bg-red-600 hover:text-white"
                    >
                      Add To Bag
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 tracking-tight text-gray-200 group-hover:text-white transition-colors">{p.name}</h4>
                    <span className="text-sm font-medium text-gray-400">Rs {Math.round(p.price || 0).toLocaleString()}</span>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* COLLECTION BANNER (Sleek Dark) */}
        <section className="bg-[#0a0a0a] border-t border-gray-900 text-white py-24 px-6 lg:px-16 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col space-y-6 order-2 lg:order-1">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-600">New Drop</span>
              <h3 className="text-4xl md:text-6xl font-display font-black leading-tight tracking-tighter">
                LEVEL UP HOODIE & JOGGERS
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-lg font-light">
                The ultimate upgrade to your gym wardrobe. Engineered with Tawny Port fabric for the perfect fit.
              </p>
              
              <div className="flex gap-10 border-t border-gray-800 pt-8">
                <div>
                  <span className="block text-2xl font-bold text-white">Rs 12,000</span>
                  <span className="text-sm text-gray-500 uppercase tracking-widest">Hoodie</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-white">Rs 9,500</span>
                  <span className="text-sm text-gray-500 uppercase tracking-widest">Joggers</span>
                </div>
              </div>

              <Link href="/collections">
                <button className="bg-white text-black px-10 py-4 text-xs font-bold tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300 mt-2 w-max hover:scale-105">
                  SHOP THE LOOK
                </button>
              </Link>
            </div>
            
            <div className="relative h-[600px] w-full order-1 lg:order-2 overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80"
                alt="Level Up Model"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>
        </section>

        {/* NEW ARRIVALS */}
        <section className="py-24 px-6 lg:px-16 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-12 border-b border-gray-800 pb-6">
            <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tighter uppercase">
              New Arrivals
            </h3>
            <a href="/products" className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-white">
              View All &rarr;
            </a>
          </div>
          
          <div id="new-arrivals-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {newArrivals.map((p) => (
              <div
                key={p.id}
                className="group cursor-pointer"
                onClick={() => (window.location.href = `/product/${p.id}`)}
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#111] mb-5 shine-effect">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-white text-black text-[9px] font-bold tracking-widest uppercase px-2 py-1 z-20">
                    New
                  </span>
                  
                  {/* Slide Up Action */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (typeof window !== "undefined" && typeof window.__addToCart === "function") {
                        window.__addToCart({ ...p, quantity: p.quantity || 1 });
                      }
                    }}
                    className="absolute bottom-0 left-0 right-0 bg-white text-black text-xs font-bold uppercase tracking-widest py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 hover:bg-red-600 hover:text-white"
                  >
                    Add To Cart
                  </button>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm tracking-tight line-clamp-1 group-hover:text-red-500 transition-colors">{p.name}</h4>
                    <span className="text-xs font-bold text-gray-400">Rs {Math.round(p.price || 0).toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {p.description || p.desc || "New-season performance gear"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}