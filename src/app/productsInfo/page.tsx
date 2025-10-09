import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import ProductDetails from './ProductDetails';

/**
 * ProductPage.jsx
 * Full product details page (route) that displays when customers want more information.
 * - Uses react-router `useParams()` to read `:id` from the URL.
 * - Fetches product details and related products (example uses DummyJSON as a fallback).
 * - Shows loading / error states, quantity selector, reviews preview, specs accordion,
 *   and related products carousel.
 * - Uses Tailwind CSS (matches the ProductDetails component styles).
 *
 * How to use:
 *  - Route this component at `/products/:id` with React Router.
 *  - Provide `onAddToCart(product, qty)` and `onBuyNow(product, qty)` handlers or
 *    let the component use `console.log` for demo.
 */

export default function ProductPage({ onAddToCart, onBuyNow, apiBase = 'https://dummyjson.com' }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        // Try fetching a real product. This uses DummyJSON as an example API.
        const res = await fetch(`${apiBase}/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        if (cancelled) return;
        setProduct(data);

        // fetch related products by category (best-effort)
        try {
          const r = await fetch(`${apiBase}/products/category/${encodeURIComponent(data.category)}?limit=6`);
          if (r.ok) {
            const rr = await r.json();
            if (!cancelled) setRelated((rr.products || []).filter(p => p.id !== data.id));
          }
        } catch (e) {
          // ignore related fetch errors
        }
      } catch (e) {
        if (!cancelled) setError(e.message || 'Unknown error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [id, apiBase]);

  function handleAdd() {
    if (onAddToCart) onAddToCart(product, qty);
    else console.log('Add to cart:', product?.id, 'qty', qty);
  }

  function handleBuy() {
    if (onBuyNow) onBuyNow(product, qty);
    else console.log('Buy now:', product?.id, 'qty', qty);
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading product…</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-lg text-center">
        <p className="text-red-500">Error: {error}</p>
        <Link to="/" className="inline-block mt-4 text-blue-700 underline">Return home</Link>
      </div>
    </div>
  );

  // fallback if product not found
  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Product not found.</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-black p-6">
      <nav className="max-w-5xl mx-auto mb-6 text-sm text-gray-600 dark:text-gray-300">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/category/${encodeURIComponent(product.category)}`} className="hover:underline">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 dark:text-gray-200">{product.title}</span>
      </nav>

      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: images */}
        <div className="md:col-span-1 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow">
          <div className="flex flex-col gap-4">
            <img src={product.thumbnail || product.images?.[0]} alt={product.title} className="w-full rounded-lg object-cover max-h-[420px]" />

            <div className="grid grid-cols-4 gap-2">
              {(product.images || []).slice(0,4).map((src, i) => (
                <img key={i} src={src} alt={`${product.title} ${i+1}`} className="w-full h-20 object-cover rounded-md" />
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            <p><strong>Brand:</strong> {product.brand || '—'}</p>
            <p><strong>Stock:</strong> {product.stock != null ? product.stock : '—'}</p>
            <p><strong>Rating:</strong> {product.rating != null ? `${product.rating} / 5` : '—'}</p>
          </div>
        </div>

        {/* Middle: main details (uses ProductDetails for layout) */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow">
            <div className="flex flex-col md:flex-row md:gap-8">
              <div className="flex-1">
                <h1 className="text-3xl font-semibold text-blue-900 dark:text-blue-300">{product.title}</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{product.category} • {product.brand}</p>

                <div className="mt-4">
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">${product.price}</p>
                  <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">{product.description}</p>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <label className="text-sm">Quantity:</label>
                  <div className="inline-flex items-center border rounded-md overflow-hidden">
                    <button onClick={() => setQty(q => Math.max(1, q-1))} className="px-3 py-2">-</button>
                    <input type="number" value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))} className="w-16 text-center" />
                    <button onClick={() => setQty(q => q+1)} className="px-3 py-2">+</button>
                  </div>

                  <div className="ml-auto flex gap-3">
                    <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-blue-800 text-white font-semibold">Add to Cart</button>
                    <button onClick={handleBuy} className="px-4 py-2 rounded-lg border-2 border-blue-800 text-blue-800 dark:text-blue-300">Buy Now</button>
                  </div>
                </div>

                {/* Specs / Accordion */}
                <div className="mt-6">
                  <details className="mb-2 p-4 border rounded-md bg-gray-50 dark:bg-slate-800">
                    <summary className="cursor-pointer font-medium">Specifications</summary>
                    <ul className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>• Category: {product.category}</li>
                      <li>• Brand: {product.brand}</li>
                      <li>• Stock: {product.stock != null ? product.stock : '—'}</li>
                      <li>• Rating: {product.rating != null ? product.rating : '—'}</li>
                    </ul>
                  </details>

                  <details className="mb-2 p-4 border rounded-md bg-gray-50 dark:bg-slate-800">
                    <summary className="cursor-pointer font-medium">Shipping & Returns</summary>
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                      Free shipping on orders over $50. 30-day returns.
                    </div>
                  </details>
                </div>

                {/* Reviews preview */}
                <div className="mt-6">
                  <h3 className="font-semibold">Customer Reviews</h3>
                  <div className="mt-2 space-y-3">
                    {/* Example static reviews — replace with real data if available */}
                    <div className="p-3 border rounded-md bg-gray-50 dark:bg-slate-800">
                      <p className="text-sm font-medium">Great product</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Sound quality is excellent — 5/5</p>
                    </div>
                    <div className="p-3 border rounded-md bg-gray-50 dark:bg-slate-800">
                      <p className="text-sm font-medium">Good value</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Comfortable and battery lasts long.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Related products */}
          {related && related.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3">Related products</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {related.map(r => (
                  <Link to={`/products/${r.id}`} key={r.id} className="block bg-white dark:bg-slate-900 rounded-lg p-3 shadow hover:shadow-md">
                    <img src={r.thumbnail || r.images?.[0]} alt={r.title} className="w-full h-28 object-cover rounded-md mb-2" />
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{r.title}</p>
                    <p className="text-sm text-blue-700 dark:text-blue-400">${r.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}

ProductPage.propTypes = {
  onAddToCart: PropTypes.func,
  onBuyNow: PropTypes.func,
  apiBase: PropTypes.string,
};
