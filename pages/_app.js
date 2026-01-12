import '../styles/globals.css';
import { CartProvider } from '../context/CartContext';
import Head from 'next/head';
import CartSidebar from '../components/CartSidebar';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function MyApp({ Component, pageProps }) {
  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

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
      <Head>
        <title>Squatwolf - Premium Activewear & Gym Clothing</title>
        <meta name="description" content="Shop the best activewear and gym clothing for men and women. Premium quality workout gear designed for peak performance." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Oswald:wght@500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="" crossOrigin="anonymous" />
      </Head>

      <Component {...pageProps} />

      {/* Global cart overlay and sidebar (hidden by default) */}
      <div id="cart-overlay" onClick={hideCart} className="fixed inset-0 bg-black bg-opacity-50 hidden opacity-0 transition-opacity duration-200 z-40"></div>
      <div id="cart-sidebar" className="fixed right-0 top-0 h-full w-96 transform translate-x-full transition-transform duration-200 z-50">
        <CartSidebar />
      </div>
    </CartProvider>
  );
}
