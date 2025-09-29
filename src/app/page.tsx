// import Image from "next/image";
// import styles from "./page.module.css";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* ===== Header ===== */}
      <header className="flex justify-between items-center p-6 border-b">
        <h1 className="text-2xl font-serif text-[#6D4C41]">Handcrafted Haven</h1>
        <nav className="space-x-6">
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">Sellers</a>
          <a href="#">About</a>
        </nav>
        <div className="space-x-4">
          <button>Login</button>
          <button>Cart</button>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <section className="flex flex-col items-center justify-center bg-[#D4A373] text-white py-24 text-center">
        <h2 className="text-4xl font-serif mb-4">Discover Handmade Treasures</h2>
        <p className="max-w-xl mb-6">
          Support artisans, shop unique crafts, and find one-of-a-kind creations.
        </p>
        <button className="bg-[#6D4C41] px-6 py-3 text-white rounded-lg">
          Shop Now
        </button>
      </section>

      {/* ===== Product Grid Placeholder ===== */}
      <section className="flex-1 p-12">
        <h3 className="text-2xl font-serif mb-6 text-center">Featured Products</h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Placeholder cards */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="h-40 bg-gray-200 rounded mb-3"></div>
              <h4 className="font-semibold">Product Title</h4>
              <p className="text-sm text-gray-600">$00.00</p>
              <button className="mt-3 w-full bg-[#FFB703] text-white py-2 rounded-lg">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-[#6D4C41] text-white py-6 text-center">
        <p>&copy; 2025 Handcrafted Haven. All rights reserved.</p>
      </footer>
    </main>
  );
}
