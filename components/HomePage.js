import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";

export default function HomePage({ products = [] }) {
  const heroVideo =
    process.env.NEXT_PUBLIC_HERO_VIDEO ||
    "https://videos.pexels.com/video-files/5319764/5319764-hd_1920_1080_25fps.mp4";

  const router = useRouter();

  // Use real products for the sticky section (first 6)
  const scrollSectionItems = products.slice(0, 6).length > 0 
    ? products.slice(0, 6) 
    : [
      {
        id: 101,
        name: "Seamless Gym Tee",
        price: 4500,
        image:
          "https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=800",
        desc: "Ultimate comfort fit",
      },
      {
        id: 102,
        name: "Flex Pro Shorts",
        price: 3800,
        image:
          "https://media.istockphoto.com/id/854321536/photo/look-at-this-gorgeous-dress.jpg?s=612x612&w=0&k=20&c=UyxEiEddYEFQPAoopwYs-_8xJ5vp0vKE0Sl3GnrQpK8=",
        desc: "4-way stretch fabric",
      },
      {
        id: 103,
        name: "Level Up Hoodie",
        price: 27200,
        image:
          "https://media.istockphoto.com/id/955641488/photo/clothes-shop-costume-dress-fashion-store-style-concept.jpg?s=612x612&w=0&k=20&c=ZouECh5-XOCuBzvKBQfxgyw0RIGEUg9u5F0sJiZV86s=",
        desc: "Tawny Port collection",
      },
      {
        id: 104,
        name: "Neotech Vest",
        price: 15000,
        image:
          "https://cdn.pixabay.com/photo/2020/03/03/12/52/girl-4898696_1280.jpg",
        desc: "Breathable mesh",
      },
      {
        id: 105,
        name: "Power Joggers",
        price: 23000,
        image:
          "https://cdn.pixabay.com/photo/2015/09/02/11/01/woman-918267_1280.jpg",
        desc: "High waist support",
      },
      {
        id: 106,
        name: "Performance Tee",
        price: 5000,
        image:
          "https://cdn.pixabay.com/photo/2018/07/22/21/59/fashion-3555650_1280.jpg",
        desc: "Moisture wicking",
      },
    ];

  // New arrivals (use first 8 real products, fallback to curated list)
  const newArrivals = products.length > 0
    ? products.slice(0, 8)
    : [
        {
          id: 201,
          name: "AeroLite Tee",
          price: 5400,
          image: "https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg?auto=compress&cs=tinysrgb&w=800",
          desc: "Featherweight, fast-dry fabric",
        },
        {
          id: 202,
          name: "Motion Flex Joggers",
          price: 8800,
          image: "https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?auto=compress&cs=tinysrgb&w=800",
          desc: "4-way stretch with taper fit",
        },
        {
          id: 203,
          name: "Prime Seamless Set",
          price: 14200,
          image: "https://images.pexels.com/photos/3737657/pexels-photo-3737657.jpeg?auto=compress&cs=tinysrgb&w=800",
          desc: "Supportive knit, zero seams",
        },
        {
          id: 204,
          name: "Velocity Shorts",
          price: 6200,
          image: "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=800",
          desc: "Mesh-lined, sweat-ready",
        },
        {
          id: 205,
          name: "Reset Hoodie",
          price: 13200,
          image: "https://images.pexels.com/photos/7679721/pexels-photo-7679721.jpeg?auto=compress&cs=tinysrgb&w=800",
          desc: "Soft loopback fleece",
        },
        {
          id: 206,
          name: "Circuit Tank",
          price: 4100,
          image: "https://images.pexels.com/photos/7679869/pexels-photo-7679869.jpeg?auto=compress&cs=tinysrgb&w=800",
          desc: "Cool-touch micro mesh",
        },
        {
          id: 207,
          name: "Lift Pro Leggings",
          price: 11500,
          image: "https://images.pexels.com/photos/3735643/pexels-photo-3735643.jpeg?auto=compress&cs=tinysrgb&w=800",
          desc: "High-rise sculpt waistband",
        },
        {
          id: 208,
          name: "Core Everyday Tee",
          price: 4800,
          image: "https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?auto=compress&cs=tinysrgb&w=800",
          desc: "Cotton-modal ultra soft",
        },
      ];

  useEffect(() => {
    if (typeof window !== "undefined" && window.__addToCart == null) {
      // no-op: CartContext exposes helpers on mount
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* HERO SECTION */}
      <header
        id="hero"
        className="relative w-full h-screen flex items-end overflow-hidden"
      >
        <div className="hero-panels" aria-hidden>
          <video
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "none",
              maskImage: "none",
              WebkitMaskImage: "none",
            }}
          >
            <source
              src={"/videos/a7bdbf1a11b74d67a8458976e2d39a53.mp4"}
              type="video/mp4"
            />
          </video>
        </div>
        <div className="absolute inset-0 hero-overlay"></div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 lg:px-8">
          <div className="hero-left-content text-white absolute left-8 bottom-12">
            <div className="hero-new-drop mb-4">NEW DROP IN</div>
            <h2 className="hero-title font-display">
              RESET.
              <br />
              RESTART.
              <br />
              REFOCUS.
            </h2>
            <div className="mt-6 hero-cta flex space-x-4">
              <Link href="/collections/men">
                <button className="btn-white px-6 py-3 font-bold">
                  SHOP MEN &gt;
                </button>
              </Link>
              <Link href="/collections/women">
                <button className="btn-outline px-6 py-3 font-bold">
                  SHOP WOMEN &gt;
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-grow">
        {/* Buttons (same styling as hero CTAs) */}
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-8 flex justify-center">
          <div className="hero-cta">
            <div className="mt-6 hero-cta flex bg-black border-2 border-black w-max">
              <Link href="/collections/men">
                <button className="bg-white text-black px-8 py-3 font-bold text-sm tracking-wider hover:bg-gray-100 transition-colors">
                  MEN'S PICKS
                </button>
              </Link>
              <Link href="/collections/women">
                <button className="bg-black text-white px-8 py-3 font-bold text-sm tracking-wider hover:bg-gray-900 transition-colors">
                  WOMEN'S PICKS
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ================= STICKY SCROLL SECTION ================= */}
        <section className="w-full max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* LEFT SIDE: Pure Image Cards (Hidden Content on Hover) */}
            <div className="flex flex-col gap-1 bg-white z-10">
              {scrollSectionItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative w-full aspect-[4/5] lg:h-[600px] group cursor-pointer overflow-hidden"
                  onClick={() => router.push(`/product/${item.id}`)}
                >
                  {/* Full Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover Overlay (Initially Hidden) */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white text-center p-8 backdrop-blur-sm">
                    
                    {/* Badge */}
                    <div className="bg-white text-black text-[10px] font-bold px-3 py-1 mb-4 tracking-widest uppercase">
                      New Drop
                    </div>

                    {/* Text Content */}
                    <h3 className="text-3xl font-display font-bold mb-2 tracking-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      {item.name}
                    </h3>
                    
                    <p className="text-lg font-light mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      Rs {item.price.toLocaleString()}
                    </p>

                    {/* Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          typeof window !== "undefined" &&
                          typeof window.__addToCart === "function"
                        )
                          window.__addToCart(item);
                      }}
                      className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150"
                    >
                      Quick Add +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE: Full Height Sticky Video */}
            <div className="hidden lg:block h-screen sticky top-0 overflow-hidden w-full">
              <div className="w-full h-full relative">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  poster="https://images.pexels.com/photos/1534126/pexels-photo-1534126.jpeg?auto=compress&cs=tinysrgb&w=800"
                >
                  <source src="/videos/rightcoloumn.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Overlay Gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 w-full p-12 text-white">
                  <div className="max-w-md">
                    <h3 className="font-display font-bold text-4xl md:text-5xl mb-4 leading-none">
                      LEVEL UP
                      <br />
                      YOUR GEAR
                    </h3>
                    <div className="h-1 w-20 bg-white mb-6"></div>
                    <p className="text-gray-200 mb-8 font-light text-sm tracking-wide">
                      Designed for those who never settle. Experience the new
                      collection engineered for peak performance.
                    </p>
                    <Link href="/collections">
                      <button className="bg-white text-black px-8 py-4 text-sm font-bold tracking-widest hover:bg-gray-200 transition uppercase">
                        Shop The Collection
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ================= END STICKY SCROLL SECTION ================= */}

        {/* ================= POPULAR CATEGORIES SECTION ================= */}
        <section className="py-16 px-4 max-w-[1600px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 tracking-wide uppercase">
            Popular Categories
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 h-auto lg:h-[650px]">
            {/* Left: Large Feature Image (Man on dark tiles) */}
            <div className="relative h-[300px] lg:h-full overflow-hidden group">
              <img
                src="https://cdn.pixabay.com/photo/2017/09/29/15/42/fashion-2799476_1280.jpg"
                alt="Man Fitness"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Right: Split Cards */}
            <div className="flex flex-col h-full gap-4 lg:gap-6">
              
              {/* Card 1: Best of Sale */}
              <div className="relative flex-1 bg-black text-white overflow-hidden">
                {/* Subtle texture */}
                <div className="absolute inset-0 opacity-10">
                  <img src="https://images.pexels.com/photos/845801/pexels-photo-845801.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover grayscale" />
                </div>

                <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-display font-bold tracking-wider">BEST OF SALE</h3>
                  </div>
                  <div>
                    <div className="text-5xl font-display font-bold mb-6 italic leading-none">UP TO 50% OFF</div>
                    <div className="flex flex-wrap gap-4">
                      <Link href="/collections/men">
                        <button className="bg-white text-black px-8 py-3 text-xs font-bold tracking-widest hover:bg-gray-200 transition-colors">
                          SHOP MEN
                        </button>
                      </Link>
                      <Link href="/collections/women">
                        <button className="border border-white text-white px-8 py-3 text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-colors">
                          SHOP WOMEN
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: T-Shirts */}
              <div className="relative flex-1 bg-gray-100 text-black overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                  <img src="https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover grayscale" />
                </div>
                <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-display font-bold tracking-wider">T-SHIRTS</h3>
                    <span className="text-xs font-bold tracking-widest uppercase border-b border-black pb-1">// Popular</span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/collections/men">
                      <button className="bg-black text-white px-8 py-3 text-xs font-bold tracking-widest hover:bg-gray-800 transition-colors">
                        SHOP MEN
                      </button>
                    </Link>
                    <Link href="/collections/women">
                      <button className="border border-black text-black px-8 py-3 text-xs font-bold tracking-widest hover:bg-black hover:text-white transition-colors">
                        SHOP WOMEN
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
        {/* ================= END POPULAR CATEGORIES SECTION ================= */}

        {/* MEN'S PICKS SECTION */}
        <section className="py-16 px-4 max-w-[1600px] mx-auto border-t border-gray-100">

          <div
            id="picks-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {products
              .filter((p) => p.gender === "men" || !p.gender)
              .slice(0, 8)
              .map((p) => (
                <div
                  key={p.id}
                  className="group product-card relative cursor-pointer"
                  onClick={() => (window.location.href = `/product/${p.id}`)}
                >
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                    {p.tag && <span className="badge">{p.tag}</span>}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          typeof window !== "undefined" &&
                          typeof window.__addToCart === "function"
                        )
                          window.__addToCart(p);
                      }}
                      className="quick-add text-xs"
                    >
                      QUICK ADD
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{p.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">
                      {p.description || p.desc || ""}
                    </p>
                    <span className="text-sm font-semibold">
                      Rs {Math.round(p.price || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Collection banner */}
        <section className="bg-brand-red text-white py-16 px-4 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-6">
              <span className="text-sm font-bold tracking-widest border border-white px-3 py-1 w-max">
                NEW DROP
              </span>
              <h3 className="text-4xl md:text-5xl font-display font-bold">
                LEVEL UP HOODIE & JOGGERS
              </h3>
              <p className="text-gray-200 text-lg">
                The ultimate upgrade to your gym wardrobe. Experience the
                perfect fit with our Tawny Port collection.
              </p>
              <div className="flex space-x-4 pt-4">
                <div>
                  <span className="block text-xl font-bold">Rs 27,200</span>
                  <span className="text-sm text-gray-300">Hoodie</span>
                </div>
                <div>
                  <span className="block text-xl font-bold">Rs 23,000</span>
                  <span className="text-sm text-gray-300">Joggers</span>
                </div>
              </div>
              <Link href="/collections">
                <button className="bg-white text-brand-dark-red px-8 py-3 text-sm font-bold tracking-widest w-max hover:bg-gray-100 transition mt-4">
                  SHOP THE LOOK
                </button>
              </Link>
            </div>
            <div className="relative h-[500px] w-full">
              <img
                src="https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Level Up Model"
                className="w-full h-full object-cover rounded-sm mix-blend-multiply opacity-90"
              />
              <div className="absolute bottom-4 right-4 bg-white text-black px-6 py-3 font-bold text-sm cursor-pointer hover:bg-gray-200">
                QUICK ADD
              </div>
            </div>
          </div>
        </section>

        {/* New arrivals */}
        <section className="py-16 px-4 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-display font-bold tracking-wide">
              NEW ARRIVALS
            </h3>
            <a
              href="/products"
              className="text-sm font-semibold border-b border-black pb-0.5"
            >
              VIEW ALL
            </a>
          </div>
          <div
            id="new-arrivals-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
          >
            {newArrivals.map((p) => (
              <div
                key={p.id}
                className="group relative cursor-pointer border border-gray-100 hover:shadow-lg transition-shadow rounded-sm"
                onClick={() => (window.location.href = `/product/${p.id}`)}
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-white text-[10px] font-bold tracking-widest px-2 py-1 uppercase shadow-sm">
                    New
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        typeof window !== "undefined" &&
                        typeof window.__addToCart === "function"
                      ) {
                        window.__addToCart({ ...p, quantity: p.quantity || 1 });
                      }
                    }}
                    className="absolute bottom-3 left-3 right-3 bg-black text-white text-xs font-semibold py-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="px-3 pb-4">
                  <h4 className="font-bold text-sm mb-1 line-clamp-1">{p.name}</h4>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                    {p.description || p.desc || "New-season performance gear"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">
                      Rs {Math.round(p.price || 0).toLocaleString()}
                    </span>
                    <span className="text-[11px] text-gray-500">Quick add +</span>
                  </div>
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
