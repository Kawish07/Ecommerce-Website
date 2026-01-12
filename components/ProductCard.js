import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="mt-2">${product.price}</p>
        <div className="mt-3 flex items-center gap-2">
          <Link href={`/product/${product.id}`} className="inline-block text-sm text-white bg-black px-4 py-2 rounded">View</Link>
          <button
            onClick={() => {
              if (typeof window !== 'undefined' && typeof window.__addToCart === 'function') {
                window.__addToCart(product);
              } else {
                // fallback: store in localStorage directly
                const raw = localStorage.getItem('cart');
                const cart = raw ? JSON.parse(raw) : [];
                const exists = cart.find((i) => i.id === product.id);
                if (exists) exists.quantity += 1; else cart.push({ ...product, quantity: 1 });
                localStorage.setItem('cart', JSON.stringify(cart));
              }
            }}
            className="text-sm px-3 py-2 border rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

