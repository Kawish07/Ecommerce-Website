import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

export default function Header({ forceSolid = false }) {
  const [count, setCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [bump, setBump] = useState(false);
  const firstLoad = useRef(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [catalog, setCatalog] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchInputRef = useRef(null);

  const searchResults = (searchQuery ? catalog.filter((p) => {
    const q = searchQuery.toLowerCase();
    return p.name?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) || p.desc?.toLowerCase().includes(q);
  }) : catalog).slice(0, 8);
  const solid = forceSolid || scrolled;
  const router = useRouter();

  const linkToSubcategoryMap = {
    't - shirts': 't-shirts', 'hoodies & jackets': 'hoodies-jackets', 'joggers': 'joggers', 'shorts': 'shorts', 'tanks': 'tanks',
    'new arrivals': 'new-arrivals', 'leggings': 'leggings', 'sports bras': 'sports-bras', 'jackets': 'jackets', 't-shirts': 't-shirts',
    'all socks': 'all-socks', 'training socks': 'training-socks', 'no show socks': 'no-show-socks', 'gym bags': 'gym-bags', 'backpacks': 'backpacks',
    'all new arrivals (67)': 'all', 'hoodies': 'hoodies', 'bestsellers': 'bestsellers', 'seamless': 'seamless',
    'tawny port collection': 'tawny-port', 'tawny port': 'tawny-port', 'the level up set': 'level-up-set',
    'train': 'train', 'reset': 'reset', 'yoga': 'yoga', 'run': 'run',
  };

  // Dark Mode & Video Content
  const menuContent = {
    'NEW IN': {
      columns: [
        { title: 'LATEST', links: ['All New Arrivals', 'T-Shirts', 'Hoodies', 'Joggers'] },
        { title: 'TRENDING', links: ['Bestsellers', 'Seamless', 'Tawny Port'] },
        { title: 'SPORT', links: ['Train', 'Run', 'Yoga'] }
      ],
      media: [
        {
          type: 'video',
          src: 'https://videos.pexels.com/video-files/6129508/6129508-hd_1920_1080_30fps.mp4', // Urban runner
          poster: 'https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?auto=compress&cs=tinysrgb&w=600',
          label: 'URBAN RUN',
          tag: 'NEW SEASON'
        },
        {
          type: 'image',
          src: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800', // Woman gym dark
          label: 'TRAINING',
          tag: 'HIGHLIGHT'
        }
      ]
    },
    'MEN': {
      columns: [
        { title: 'GEAR', links: ['T - Shirts', 'Hoodies & Jackets', 'Joggers', 'Shorts', 'Tanks'] },
        { title: 'COLLECTIONS', links: ['Bestsellers', 'Seamless', 'Tawny Port'] },
        { title: 'ACTIVITY', links: ['Train', 'Reset', 'Run'] }
      ],
      media: [
        {
          type: 'video',
          src: 'https://videos.pexels.com/video-files/5309406/5309406-hd_1920_1080_25fps.mp4', // Man pushup
          poster: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600',
          label: 'PERFORMANCE',
          tag: 'GYM ESSENTIALS'
        },
        {
          type: 'image',
          src: 'https://images.pexels.com/photos/1587008/pexels-photo-1587008.jpeg?auto=compress&cs=tinysrgb&w=800', // Dark moody man
          label: 'STREET',
          tag: 'NEW ARRIVAL'
        }
      ]
    },
    'WOMEN': {
      columns: [
        { title: 'GEAR', links: ['New Arrivals', 'T - Shirts', 'Leggings', 'Sports Bras', 'Jackets'] },
        { title: 'COLLECTIONS', links: ['Bestsellers', 'Seamless', 'The Level Up Set'] },
        { title: 'ACTIVITY', links: ['Train', 'Reset', 'Yoga'] }
      ],
      media: [
        {
          type: 'video',
          src: 'https://videos.pexels.com/video-files/5834751/5834751-hd_1920_1080_24fps.mp4', // Yoga flow
          poster: 'https://images.pexels.com/photos/4462782/pexels-photo-4462782.jpeg?auto=compress&cs=tinysrgb&w=600',
          label: 'FLOW',
          tag: 'YOGA'
        },
        {
          type: 'image',
          src: 'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=800', 
          label: 'STUDIO',
          tag: 'VIEW ALL'
        }
      ]
    },
    'ACCESSORIES': {
      columns: [
        { title: 'SHOP ALL', links: ['New Arrivals', 'Bestsellers'] },
        { title: 'GEAR', links: ['Gym Bags', 'Backpacks', 'Bottles'] },
        { title: 'SOCKS', links: ['All Socks', 'Training', 'No Show'] },
        { title: 'HEADWEAR', links: ['Caps', 'Headbands'] }
      ],
      media: [
        {
          type: 'image',
          src: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800',
          label: 'ACCESSORIES',
          tag: 'GEAR',
          fullWidth: true
        }
      ]
    }
  };

  // Logic Hooks (Same as before)
  useEffect(() => {
    function updateCount() {
      try {
        const raw = localStorage.getItem('cart');
        const cart = raw ? JSON.parse(raw) : [];
        const c = cart.reduce((s, i) => s + (i.quantity || i.qty || 0), 0);
        setCount(c);
      } catch (e) { setCount(0); }
    }
    updateCount();
    window.addEventListener('cart-changed', updateCount);
    window.addEventListener('storage', updateCount);
    return () => {
      window.removeEventListener('cart-changed', updateCount);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  useEffect(() => {
    if (!showSearch || catalog.length > 0 || searchLoading) return;
    let cancelled = false;
    const load = async () => {
      try {
        setSearchLoading(true);
        const base = process.env.NEXT_PUBLIC_SITE_URL || '';
        const res = await fetch(`${base}/api/products`);
        if (!res.ok) throw new Error('Failed products');
        const data = await res.json();
        if (!cancelled) setCatalog(Array.isArray(data.products) ? data.products : []);
      } catch (e) { if (!cancelled) setCatalog([]); }
      finally { if (!cancelled) setSearchLoading(false); }
    };
    load();
    return () => { cancelled = true; };
  }, [showSearch, catalog.length, searchLoading]);

  useEffect(() => {
    if (showSearch && searchInputRef.current) searchInputRef.current.focus();
  }, [showSearch]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setShowSearch(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (firstLoad.current) { firstLoad.current = false; return; }
    if (count <= 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 350);
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => {
    function onScroll() {
      const hero = document.getElementById('hero');
      const heroBottom = hero ? (hero.offsetTop + hero.offsetHeight) : window.innerHeight;
      if (window.scrollY >= heroBottom - 10) setScrolled(true);
      else setScrolled(false);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => { setMounted(true); }, []);
  const handleMouseLeave = () => setActiveMenu(null);

  return (
    <>
      <style jsx global>{`
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-down { animation: slideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes cartBump { 0% { transform: scale(1); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
        .animate-cart-bump { animation: cartBump 0.3s ease-out; }
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: #1a1a1a; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #444; border-radius: 10px; }
      `}</style>
      
      <header 
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${solid ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
        onMouseLeave={handleMouseLeave}
      >
        {/* Promo Bar */}
        <div className={`${solid ? 'bg-gray-900 text-white' : 'bg-black/80 backdrop-blur text-white'} text-[10px] font-bold tracking-[0.15em] uppercase py-1.5`}>
          <div className="max-w-[1600px] mx-auto px-4 lg:px-8 flex justify-center items-center">
            <span className="hover:opacity-80 cursor-pointer">Free Shipping on Orders Over PKR 5,000</span>
          </div>
        </div>

        {/* Main Nav */}
        <div className="w-full">
          <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
            <div className={`flex items-center h-16 md:h-20 justify-between transition-colors duration-300 ${solid ? 'text-black' : 'text-white'}`}>
              
              <div className="hidden md:flex items-center space-x-8 text-[11px] font-bold tracking-[0.2em] uppercase">
                {['NEW IN', 'MEN', 'WOMEN', 'ACCESSORIES'].map((menu) => (
                  <div key={menu} className="relative group cursor-pointer h-full flex items-center" onMouseEnter={() => setActiveMenu(menu)}>
                    <span className={`transition-colors duration-300 ${activeMenu === menu ? 'text-black' : solid ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-200'}`}>
                      {menu}
                    </span>
                    <span className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full transition-all duration-300 ${activeMenu === menu ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-10px]'}`}></span>
                  </div>
                ))}
              </div>

              <div className="flex-1 md:flex-none text-center">
                <Link href="/" className={`text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none ${mounted && solid ? 'text-black' : 'text-white'}`}>
                  Squatwolf<span className={`text-[10px] md:text-xs align-top ml-1 font-normal ${mounted && solid ? 'text-black' : 'text-white'}`}>®</span>
                </Link>
              </div>

              <div className="flex items-center space-x-5 text-sm">
                <button aria-label="search" className={`hover:opacity-70 transition-opacity ${solid ? 'text-black' : 'text-white'}`} onClick={() => setShowSearch(true)}>
                  <i className="fas fa-search"></i>
                </button>
                <button aria-label="account" className={`hover:opacity-70 transition-opacity ${solid ? 'text-black' : 'text-white'}`}><i className="fas fa-user"></i></button>
                <button aria-label="cart" className="relative hover:opacity-70 transition-opacity" onClick={() => { if (typeof window !== 'undefined') { const el = document.getElementById('cart-sidebar'); if (el) el.classList.remove('translate-x-full'); const overlay = document.getElementById('cart-overlay'); if (overlay) { overlay.classList.remove('hidden'); setTimeout(()=>overlay.classList.remove('opacity-0'),10); } } }}>
                  <i className={`fas fa-shopping-bag ${solid ? 'text-black' : 'text-white'}`}></i>
                  {count>0 && (
                    <span className={`absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] w-4 h-4 flex items-center justify-center font-bold ${bump ? 'animate-cart-bump' : ''}`}>
                      {count}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DASHING DARK MODE MEGA MENU ================= */}
        {activeMenu && menuContent[activeMenu] && (
          <div 
            className="absolute top-full left-0 w-full bg-[#0a0a0a] border-t border-gray-800 z-40 animate-slide-down shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            onMouseEnter={() => setActiveMenu(activeMenu)}
          >
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
              <div className="grid grid-cols-12 gap-10 items-start">
                
                {/* Left: Dark Links */}
                <div className="col-span-12 lg:col-span-4 flex flex-col justify-between pr-8">
                  <div className="space-y-8">
                    {menuContent[activeMenu].columns.map((col, idx) => (
                      <div key={idx}>
                        <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.25em] mb-4">
                          {col.title}
                        </h4>
                        <ul className="grid grid-cols-1 gap-3">
                          {col.links.map((link, lIdx) => {
                            const subcategorySlug = linkToSubcategoryMap[link.toLowerCase()] || link.toLowerCase().replace(/ /g, '-').replace(/[()]/g, '');
                            return (
                              <li key={lIdx}>
                                <Link 
                                  href={`/collections/${activeMenu.toLowerCase().replace(/ /g, '-')}/${subcategorySlug}`}
                                  className="text-sm font-medium text-white hover:text-gray-300 transition-colors duration-200 flex items-center gap-2 group/item"
                                >
                                  <span className="w-1.5 h-1.5 bg-gray-700 rounded-full group-hover/item:bg-red-600 transition-colors"></span>
                                  <span className="group-hover/item:translate-x-1 transition-transform duration-300">{link}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-8 mt-4 border-t border-gray-800">
                    <Link href={`/collections/${activeMenu.toLowerCase().replace(/ /g, '-')}`} className="text-[11px] font-black uppercase tracking-widest border-b border-red-600 pb-0.5 hover:text-red-500 hover:border-red-500 transition-all">
                      View All {activeMenu}
                    </Link>
                  </div>
                </div>

                {/* Right: Dark Media Cards */}
                <div className="col-span-12 lg:col-span-8 flex gap-5 h-full">
                  {menuContent[activeMenu].media.map((item, idx) => (
                    <Link 
                      key={idx} 
                      href={item.link || `/collections/${activeMenu.toLowerCase().replace(/ /g, '-')}`}
                      className={`relative overflow-hidden group rounded-sm flex-1 ${item.fullWidth ? 'w-full' : 'w-1/2'}`}
                    >
                      {/* Media Wrapper */}
                      <div className="relative w-full h-[300px] bg-gray-900 overflow-hidden">
                        {item.type === 'video' ? (
                          <video 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            poster={item.poster}
                          >
                            <source src={item.src} type="video/mp4" />
                          </video>
                        ) : (
                          <img 
                            src={item.src} 
                            alt={item.label} 
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                          />
                        )}
                        
                        {/* Dark Gradient for readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90"></div>
                        
                        {/* Subtle white glow on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 transition-opacity duration-700 pointer-events-none"></div>
                      </div>
                      
                      {/* Text Overlay */}
                      <div className="absolute bottom-5 left-5 right-5 z-10">
                        {item.tag && (
                           <span className="inline-block bg-white/10 backdrop-blur-sm text-white border border-white/10 px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded-sm mb-2">
                            {item.tag}
                          </span>
                        )}
                        <h3 className="text-white text-xl font-black uppercase leading-none tracking-tight drop-shadow-md group-hover:text-red-500 transition-colors">
                          {item.label}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>

              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Overlay - Dark Mode */}
      {showSearch && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-md flex items-start justify-center px-4 pt-20" role="dialog" aria-modal="true">
          <div className="absolute inset-0" onClick={() => setShowSearch(false)}></div>
          <div className="relative w-full max-w-3xl bg-[#111] border border-gray-800 rounded-xl shadow-2xl overflow-hidden animate-slide-down">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-800 bg-[#1a1a1a]">
              <i className="fas fa-search text-gray-500"></i>
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 outline-none text-base font-medium placeholder-gray-600 text-white bg-transparent"
              />
              <button onClick={() => setShowSearch(false)} className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-wide">Close</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 max-h-[400px] overflow-y-auto custom-scroll">
              <div className="md:col-span-2 p-6 border-r border-gray-800">
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Products</h4>
                <div className="space-y-4">
                  {searchResults.map((p) => (
                    <Link key={p.id} href={`/product/${p.id}`} className="flex gap-4 p-2 hover:bg-gray-800 rounded-lg transition-colors group">
                      <div className="w-12 h-12 bg-gray-800 rounded-md overflow-hidden flex-shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white truncate group-hover:text-gray-300">{p.name}</p>
                        <p className="text-xs text-gray-500 mt-1">Rs {Math.round(p.price || 0).toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-[#0d0d0d]">
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Categories</h4>
                <div className="space-y-2">
                  <Link href="/collections/men" className="block text-sm font-medium text-gray-400 hover:text-white">Men</Link>
                  <Link href="/collections/women" className="block text-sm font-medium text-gray-400 hover:text-white">Women</Link>
                  <Link href="/collections/accessories" className="block text-sm font-medium text-gray-400 hover:text-white">Accessories</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}