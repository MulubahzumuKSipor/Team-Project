'use client'; // Client Component

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useCart } from "./lib/CartContext";
import { FeaturedUser, getFeaturedProducts } from "./lib/data";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedUser[]>([]);
  const { cart, addToCart } = useCart();

  // Fetch featured products on client side
  useEffect(() => {
    async function fetchProducts() {
      const data = await getFeaturedProducts();
      setFeaturedProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      {/* <span>Cart ({cart.length})</span> */}
      {/* Hero */}
      <section className={styles.hero}>
        <h2>Discover Handmade Treasures</h2>
        <p>Support artisans, shop unique crafts, and find one-of-a-kind creations.</p>
        <Link href={"/shop"}>
          <button className={styles.buttonPrimary}>Shop Now</button>
        </Link>
      </section>

      {/* Featured Products */}
      <main className={styles.productsSection}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <p className={styles.sectionSubtitle}>
          Our best picks, crafted with love and care
        </p>
        <div className={styles.productGrid}>
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <div key={product.user_id} className={styles.productCard}>
                <div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={150}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h4>{product.name}</h4>
                <p className={styles.productPrice}>{product.shop_name}</p>
                
                <button
                  className={styles.buttonPrimary}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </main>
    </div>
  );
}
