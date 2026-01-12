import { createContext, useContext, useReducer, useEffect } from 'react';

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
  const [state, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const raw = localStorage.getItem('cart');
    if (raw) dispatch({ type: 'HYDRATE', payload: JSON.parse(raw) });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    // expose a simple global helper for non-hook callers (e.g., product cards)
    if (typeof window !== 'undefined') {
      window.__addToCart = (product) => {
        dispatch({ type: 'ADD', payload: product });
        try { window.dispatchEvent(new CustomEvent('cart-changed')); } catch (e) {}
      };
    }
    return () => {
      if (typeof window !== 'undefined') delete window.__addToCart;
    };
  }, []);

  const add = (product) => dispatch({ type: 'ADD', payload: product });
  const remove = (product) => dispatch({ type: 'REMOVE', payload: product });
  const clear = () => dispatch({ type: 'CLEAR' });

  return (
    <CartContext.Provider value={{ cart: state, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
