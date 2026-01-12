import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Header({ forceSolid = false }) {
  const [count, setCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'NEW IN', 'MEN', 'WOMEN', 'ACCESSORIES', or null
  const solid = forceSolid || scrolled;
  const router = useRouter();

  // Mega Menu Content Data matching the provided screenshots
  const menuContent = {
    'NEW IN': {
      columns: [
        {
          title: 'NEW',
          links: ['All New Arrivals (67)', 'T-Shirts', 'Hoodies', 'Joggers']
        },
        {
          title: 'HIGHLIGHTS',
          links: ['Bestsellers', 'Seamless', 'Tawny Port Collection']
        },
        {
          title: 'ACTIVITY',
          links: ['Train', 'Reset', 'Yoga']
        }
      ],
      images: [
        {
          src: 'https://images.pexels.com/photos/5325898/pexels-photo-5325898.jpeg?auto=compress&cs=tinysrgb&w=800',
          label: 'WOMEN',
          overlay: 'NEW ARRIVALS'
        },
        {
          src: 'https://images.pexels.com/photos/7629202/pexels-photo-7629202.jpeg?auto=compress&cs=tinysrgb&w=800',
          label: 'MEN',
          overlay: 'NEW ARRIVALS'
        }
      ]
    },
    'MEN': {
      columns: [
        {
          title: "MEN'S CLOTHING",
          links: ['T - Shirts', 'Hoodies & Jackets', 'Joggers', 'Shorts', 'Tanks']
        },
        {
          title: 'HIGHLIGHTS',
          links: ['Bestsellers', 'Seamless', 'Tawny Port']
        },
        {
          title: 'ACTIVITY',
          links: ['Train', 'Reset', 'Run']
        }
      ],
      images: [
        {
          src: 'https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&w=800', 
          label: 'HOODIE',
          overlay: 'RESET >',
          link: '/collections/men/hoodies-jackets'
        },
        {
          src: 'https://images.pexels.com/photos/8350438/pexels-photo-8350438.jpeg?auto=compress&cs=tinysrgb&w=800', 
          label: 'T-SHIRT',
          overlay: 'BEST - SELLING T - SHIRTS',
          link: '/collections/men/t-shirts'
        }
      ]
    },
    'WOMEN': {
      columns: [
        {
          title: "WOMEN'S CLOTHING",
          links: ['New Arrivals', 'T - Shirts', 'Leggings', 'Sports Bras', 'Jackets']
        },
        {
          title: 'HIGHLIGHTS',
          links: ['Bestsellers', 'Seamless', 'The Level Up Set']
        },
        {
          title: 'ACTIVITY',
          links: ['Train', 'Reset', 'Yoga']
        }
      ],
      images: [
        {
          src: 'https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=800', 
          label: 'SETS',
          overlay: 'RESET',
          link: '/collections/women/the-level-up-set'
        },
        {
          src: 'https://images.pexels.com/photos/4462782/pexels-photo-4462782.jpeg?auto=compress&cs=tinysrgb&w=800', 
          label: 'LEGGINGS',
          overlay: 'BEST - SELLING LEGGINGS',
          link: '/collections/women/leggings'
        }
      ]
    },
    'ACCESSORIES': {
      columns: [
        {
          title: 'CATEGORIES',
          links: ['New Arrivals', 'Bestsellers']
        },
        {
          title: 'SOCKS',
          links: ['All Socks', 'Training Socks', 'No Show Socks']
        },
        {
          title: 'BAGS',
          links: ['Gym Bags', 'Backpacks']
        },
        {
          title: 'HEADWEAR',
          links: ['Caps', 'Headbands']
        }
      ],
      images: [
        {
          src: 'https://images.pexels.com/photos/845801/pexels-photo-845801.jpeg?auto=compress&cs=tinysrgb&w=800', 
          label: 'HYDRATION',
          overlay: 'ACCESSORIES >',
          fullWidth: true,
          link: '/collections/accessories'
        }
      ]
    }
  };

  // Cart Logic
  useEffect(() => {
    function updateCount() {
      try {
        const raw = localStorage.getItem('cart');
        const cart = raw ? JSON.parse(raw) : [];
        const c = cart.reduce((s, i) => s + (i.quantity || i.qty || 0), 0);
        setCount(c);
      } catch (e) {
        setCount(0);
      }
    }

    updateCount();
    window.addEventListener('cart-changed', updateCount);
    window.addEventListener('storage', updateCount);
    return () => {
      window.removeEventListener('cart-changed', updateCount);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  // Scroll Logic
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

  // Set mounted to true after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse Leave Logic to Close Menu (when leaving the header area entirely)
  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slideDown 0.2s ease-out forwards;
        }
      `}</style>
      
      <header 
        className={`w-full fixed top-0 left-0 z-50 transition-colors duration-200 ${solid ? 'bg-white shadow-md' : 'bg-transparent'}`}
        onMouseLeave={handleMouseLeave}
      >
        {/* Top promo bar */}
        <div className={`${solid ? 'bg-white text-black' : 'bg-black bg-opacity-60 text-white'} text-xs py-1 transition-colors duration-200`}>
          <div className="max-w-[1600px] mx-auto px-4 lg:px-8 flex justify-between items-center">
            <div>20% OFF ON YOUR FIRST ORDER, USE CODE: WELCOME20 &nbsp; <span className={`ml-2 border-l ${solid ? 'border-black' : 'border-white'} pl-2`}><a href="/" className={`underline ${solid ? 'text-black' : 'text-white'}`}>SHOP NOW &gt;</a></span></div>
            <div className={`text-right ${solid ? 'text-black' : 'text-white'}`}>ENGLISH &nbsp; <span className="mx-2">|</span> PAKISTAN</div>
          </div>
        </div>

        {/* Main nav */}
        <div className="w-full">
          <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
            <div className={`flex items-center h-16 justify-between ${solid ? 'text-black' : 'text-white'}`}>
              <div className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wider">
                
                {/* HOVER TRIGGER LINKS */}
                <div 
                  className="relative cursor-pointer"
                  onMouseEnter={() => setActiveMenu('NEW IN')}
                >
                  <span className={`${activeMenu === 'NEW IN' ? 'opacity-60' : ''} ${solid ? 'text-black' : 'text-white'} hover:opacity-80 transition-opacity`}>NEW IN</span>
                </div>

                <div 
                  className="relative cursor-pointer"
                  onMouseEnter={() => setActiveMenu('MEN')}
                >
                  <span className={`${activeMenu === 'MEN' ? 'opacity-60' : ''} ${solid ? 'text-black' : 'text-white'} hover:opacity-80 transition-opacity`}>MEN</span>
                </div>

                <div 
                  className="relative cursor-pointer"
                  onMouseEnter={() => setActiveMenu('WOMEN')}
                >
                  <span className={`${activeMenu === 'WOMEN' ? 'opacity-60' : ''} ${solid ? 'text-black' : 'text-white'} hover:opacity-80 transition-opacity`}>WOMEN</span>
                </div>

                <div 
                  className="relative cursor-pointer"
                  onMouseEnter={() => setActiveMenu('ACCESSORIES')}
                >
                  <span className={`${activeMenu === 'ACCESSORIES' ? 'opacity-60' : ''} ${solid ? 'text-black' : 'text-white'} hover:opacity-80 transition-opacity`}>ACCESSORIES</span>
                </div>
                
              </div>

              <div className="flex-1 md:flex-none text-center">
                <a href="/" className={`text-3xl font-display font-bold tracking-tighter uppercase cursor-pointer hover:opacity-80 transition-opacity inline-block ${mounted && solid ? 'text-black' : 'text-white'}`}>
                  Squatwolf<span className={`text-xs align-top ${mounted && solid ? 'text-black' : 'text-white'}`}>®</span>
                </a>
              </div>

              <div className="flex items-center space-x-6">
                <div className={`hidden lg:flex items-center space-x-2 text-xs font-semibold ${solid ? 'text-black' : 'text-white'}`}>
                  <span>PKR</span>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <button aria-label="search" className={`text-lg hover:text-gray-300 ${solid ? 'text-black' : 'text-white'}`}><i className="fas fa-search"></i></button>
                <button aria-label="account" className={`text-lg hover:text-gray-300 ${solid ? 'text-black' : 'text-white'}`}><i className="fas fa-user"></i></button>
                <button aria-label="cart" className="relative" onClick={() => { if (typeof window !== 'undefined') { const el = document.getElementById('cart-sidebar'); if (el) el.classList.remove('translate-x-full'); const overlay = document.getElementById('cart-overlay'); if (overlay) { overlay.classList.remove('hidden'); setTimeout(()=>overlay.classList.remove('opacity-0'),10); } } }}>
                  <i className={`fas fa-shopping-bag text-lg hover:text-gray-300 ${solid ? 'text-black' : 'text-white'}`}></i>
                  {count>0 && <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{count}</span>}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MEGA MENU DROPDOWN (HOVER) ================= */}
        {activeMenu && menuContent[activeMenu] && (
          <div 
            className="absolute top-full left-0 w-full bg-white shadow-2xl z-40 border-t border-gray-100 animate-slide-down"
            onMouseEnter={() => setActiveMenu(activeMenu)} // Keep open if hovering over menu
          >
            <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6">
              <div className="grid grid-cols-12 gap-8">
                
                {/* Left Side: Navigation Columns (4 cols) */}
                <div className="col-span-12 lg:col-span-4 flex flex-col justify-center border-r border-gray-100 pr-8">
                  {menuContent[activeMenu].columns.map((col, idx) => (
                    <div key={idx} className="mb-4 last:mb-0">
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 border-b border-gray-200 pb-1">
                        {col.title}
                      </h4>
                      <ul className="space-y-1.5">
                        {col.links.map((link, lIdx) => (
                          <li key={lIdx}>
                            <Link 
                              href={`/collections/${activeMenu.toLowerCase().replace(/ /g, '-')}/${link.toLowerCase().replace(/ /g, '-').replace(/[()]/g, '')}`}
                              className="text-sm text-gray-600 hover:text-black font-medium transition-colors"
                            >
                              {link}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  {/* "View All" link at bottom of sidebar */}
                  <div className="mt-auto pt-4">
                    <Link href={`/collections/${activeMenu.toLowerCase().replace(/ /g, '-')}`} className="text-xs font-bold text-red-600 uppercase tracking-widest border-b border-red-600 pb-0.5 hover:text-red-700 transition-colors">
                      View All {activeMenu} &gt;
                    </Link>
                  </div>
                </div>

                {/* Right Side: Images (8 cols) */}
                <div className="col-span-12 lg:col-span-8 flex gap-4 h-full relative">
                  {menuContent[activeMenu].images.map((img, idx) => (
                    <Link 
                      key={idx} 
                      href={img.link || `/collections/${activeMenu.toLowerCase().replace(/ /g, '-')}`}
                      className={`relative overflow-hidden group ${img.fullWidth ? 'w-full' : 'w-1/2'} cursor-pointer block`}
                    >
                      <img 
                        src={img.src} 
                        alt={img.label} 
                        className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                      
                      {/* Overlay Text/Button */}
                      <div className="absolute bottom-0 left-0 w-full p-4">
                        <div className="flex flex-col items-start space-y-1.5">
                           {img.overlay && (
                             <button className="bg-white text-black px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-gray-100 transition transform translate-y-2 group-hover:translate-y-0 duration-300">
                               {img.overlay}
                             </button>
                           )}
                           {img.label && (
                             <span className="text-white text-xs font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-300">
                               SHOP {img.label}
                             </span>
                           )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}