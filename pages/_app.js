import '../styles/globals.css';
import { CartProvider } from '../context/CartContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CartSidebar = dynamic(() => import('../components/CartSidebar'), { ssr: false });

export default function MyApp({ Component, pageProps }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Page transitions
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsTransitioning(true);
      setMobileMenuOpen(false);
    };
    const handleRouteChangeComplete = () => {
      setIsTransitioning(false);
    };
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  // overlay click handler hides the sidebar
  const hideCart = () => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById('cart-sidebar');
    if (el && !el.classList.contains('translate-x-full')) el.classList.add('translate-x-full');
    const overlay = document.getElementById('cart-overlay');
    if (overlay) {
      overlay.classList.add('opacity-0');
      setTimeout(()=>overlay.classList.add('hidden'), 200);
    }
  };

  return (
    <CartProvider>
      <div className={`page-transition ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
        <Component {...pageProps} />
      </div>

      {/* Global cart overlay and sidebar (hidden by default) */}
      <div id="cart-overlay" onClick={hideCart} className="fixed inset-0 bg-black bg-opacity-50 hidden opacity-0 transition-opacity duration-200 z-40"></div>
      <div id="cart-sidebar" className="fixed right-0 top-0 h-full w-full sm:w-96 md:w-[480px] lg:w-[520px] transform translate-x-full transition-transform duration-200 z-50">
        <CartSidebar />
      </div>
    </CartProvider>
  );
}
