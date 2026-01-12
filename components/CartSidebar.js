import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { cart = [], remove, clear } = useCart() || {};

  const close = () => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById('cart-sidebar');
    if (el && !el.classList.contains('translate-x-full')) el.classList.add('translate-x-full');
    const overlay = document.getElementById('cart-overlay');
    if (overlay) {
      overlay.classList.add('opacity-0');
      setTimeout(()=>overlay.classList.add('hidden'), 200);
    }
  };

  const subtotal = (cart || []).reduce((s, i) => s + (Number(i.price || 0) * (i.quantity || 1)), 0);

  return (
    <aside className="w-96 bg-white border-l p-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Cart</h3>
        <button aria-label="close cart" onClick={close} className="text-sm text-gray-600">Close ✕</button>
      </div>

      <div className="mt-4 flex-1 overflow-auto">
        {(!cart || cart.length === 0) ? (
          <div className="text-gray-600">Your cart is empty</div>
        ) : (
          <ul className="space-y-4">
            {cart.map(item => (
              <li key={item.id} className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{item.name}</div>
                  <div className="text-xs text-gray-500">Qty: {item.quantity || 1}</div>
                </div>
                <div className="text-sm font-semibold">Rs {Math.round((item.price||0) * (item.quantity||1)).toLocaleString()}</div>
                <button onClick={() => remove(item)} className="text-xs text-red-600 ml-2">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-4 border-t">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">Subtotal</div>
          <div className="text-lg font-bold">Rs {Math.round(subtotal).toLocaleString()}</div>
        </div>

        <div className="flex space-x-2">
          <button onClick={() => { if (cart.length) window.location.href = '/checkout'; }} className="flex-1 bg-black text-white px-4 py-3 text-sm font-bold">Checkout</button>
          <button onClick={() => clear()} className="flex-1 border border-gray-200 text-sm">Clear</button>
        </div>
      </div>
    </aside>
  );
}
