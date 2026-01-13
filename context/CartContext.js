import { createContext, useContext, useReducer, useEffect, useState } from 'react';

function getInitialCart() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem('cart');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('Failed to parse cart from storage', e);
    return [];
  }
}

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload || [];
    case 'ADD': {
      const exists = state.find((i) => i.id === action.payload.id);
      if (exists) return state.map((i) => i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case 'REMOVE':
      return state.filter((i) => i.id !== action.payload.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  // Start empty on server to avoid hydration mismatch; hydrate from storage on client
  const [state, dispatch] = useReducer(cartReducer, []);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage after mount
  useEffect(() => {
    const initial = getInitialCart();
    dispatch({ type: 'HYDRATE', payload: initial });
    setHydrated(true);
    // notify once to sync listeners with hydrated count
    if (typeof window !== 'undefined') {
      try { window.dispatchEvent(new CustomEvent('cart-changed')); } catch (e) {}
    }
  }, []);

  // Persist cart when hydrated
  useEffect(() => {
    if (!hydrated) return; // avoid overwriting persisted cart before hydration completes
    try {
      window.localStorage.setItem('cart', JSON.stringify(state));
      // notify listeners after storage is updated so they read fresh data
      window.dispatchEvent(new CustomEvent('cart-changed'));
    } catch (e) {
      console.warn('Failed to persist cart to storage', e);
    }
  }, [state, hydrated]);

  useEffect(() => {
    // expose a simple global helper for non-hook callers (e.g., product cards)
    if (typeof window !== 'undefined') {
      window.__addToCart = (product) => {
        dispatch({ type: 'ADD', payload: product });
      };
    }
    return () => {
      if (typeof window !== 'undefined') delete window.__addToCart;
    };
  }, []);

  const add = (product) => { dispatch({ type: 'ADD', payload: product }); };
  const remove = (product) => { dispatch({ type: 'REMOVE', payload: product }); };
  const clear = () => { dispatch({ type: 'CLEAR' }); };

  return (
    <CartContext.Provider value={{ cart: state, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
