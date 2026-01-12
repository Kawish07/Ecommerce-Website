import Header from '../components/Header';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, remove, clear } = useCart();
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2);
  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <div className="mt-6 space-y-4">
          {cart.length === 0 && <div>Your cart is empty.</div>}
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border p-4 rounded">
              <div className="flex items-center gap-4">
                <img src={item.image} className="w-24 h-24 object-cover rounded" />
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm">Qty: {item.quantity}</div>
                </div>
              </div>
              <div className="text-right">
                <div>${(item.price * item.quantity).toFixed(2)}</div>
                <button onClick={() => remove(item)} className="text-sm text-red-600 mt-2">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="text-xl font-bold">Total: ${total}</div>
          <div className="space-x-2">
            <button onClick={() => clear()} className="px-4 py-2 border rounded">Clear</button>
            <a href="/checkout" className="px-4 py-2 bg-black text-white rounded">Checkout</a>
          </div>
        </div>
      </main>
    </div>
  );
}
