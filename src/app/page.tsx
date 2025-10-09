import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      {/* Header */}
      <header className={styles.header}>
        <h1
          style={{
            color: "var(--color-primary)",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          <a href="/">Handcrafted Haven</a>
        </h1>
        <nav className={styles.nav}>
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/sellers">Sellers</a>
          <a href="/about">About</a>
        </nav>
        <div>
          <button className={styles.buttonPrimary}>Login</button>
          <button className={styles.buttonSecondary}>Cart</button>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <h2>Discover Handmade Treasures</h2>
        <p>
          Support artisans, shop unique crafts, and find one-of-a-kind
          creations.
        </p>
        <button className={styles.buttonPrimary}>Shop Now</button>
      </section>

      {/* Featured Products Section */}
      <main className={styles.productsSection}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <p className={styles.sectionSubtitle}>
          Our best picks, crafted with love and care
        </p>
        <a href="/productsInfo">
          <div className={styles.productGrid}>
            {[45, 55, 30, 20].map((price, i) => (
              <div key={i} className={styles.productCard}>
                <div
                  style={{
                    height: "150px",
                    background: "#eee",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
                <h4>Product Title</h4>
                <p className={styles.productPrice}>${price}.00</p>
                <button className={styles.buttonPrimary}>Add to Cart</button>
              </div>
            ))}
          </div>
        </a>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Handcrafted Haven. Team #3. All rights reserved.</p>
        <div>
          <a href="/about">About</a> | <a href="#">Contact</a> |{" "}
          <a href="#">Terms</a>
        </div>
      </footer>
    </div>
  );
}
