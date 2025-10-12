import Image from "next/image";
import styles from "./page.module.css";
import { getData, getUserById, } from "./lib/data";


// Define TypeScript interfaces for data
interface Seller {
  id: number;
  shop_name: string;
  // category?: string; // Uncomment if you plan to use it later
}

interface UserData {
  id: number;
  shop_name: string;
  jsonb: {
    image: string;
  };
  user_data: {
    firstName: string;
    lastName: string;
    image: string;
  };
}


export default async function Home() {
  const data = await getData();
  
  
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
            {data && data.length > 0 ? data.map((user) => (
              <div key={user.id} className={styles.productCard}>
                <div
                  style={{
                    height: "150px",
                    background: "#eee",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
                <h4>{user.shop_name}</h4>
                <button className={styles.buttonPrimary}>Add to Cart</button>
              </div>
            )):(
              <p>Loading products...</p>
            )}
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
