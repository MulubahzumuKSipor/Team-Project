"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 mt-10">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Artisan Market</p>
        <ul className="flex gap-6 text-sm">
          <li>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link href="/sellers" className="hover:underline">
              Sellers
            </Link>
          </li>
          <li>
            <Link href="/shop" className="hover:underline">
              Shop
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
