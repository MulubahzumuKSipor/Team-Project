import styles from "../page.module.css";
import Image from "next/image";
import { getData, getUserById, getSellerById, getSellers } from "../lib/data";

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

export default async function Sellers() {
  const sellers: Seller[] = await getSellers();
  const user_data: UserData[] = await getData();
  

  return (
    <div>
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
      </header>

      <main style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 1rem" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            marginBottom: "2rem",
          }}
        >
          Our Sellers
        </h2>

        

        {/* User Data Display */}
        {/* {user_data && user_data.length > 0 ? (
          <Image
            src={user_data[0].jsonb.image}
            alt={user_data[0].jsonb.shop_name}
            width={300}
            height={300}
          />
        ) : (
          <div>No user data found</div>
        )} */}

        {/* Featured Seller Display */}
          <div className={styles.productGrid}>
            {user_data && user_data.length > 0 ? (
              user_data.map((user) => (
                <div className={styles.productCard} key={user.id}>
                  <Image
                    src={user.user_data.image}
                    width={100}
                    height={76}
                    alt="Screenshots of the dashboard project showing desktop version"
                  />
                
                  <h4 key={user.id}>{user.shop_name}</h4>
                  <p key={user.id}>{user.shop_name}</p>
                </div>
              ))
            ) : (
              <div>No featured sellers found</div>
            )}
          </div>

      
        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button className={styles.buttonPrimary}>Become a Seller</button>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 Handcrafted Haven. All rights reserved.</p>
        <div>
          <a href="/about">About</a> | <a href="/sellers">Sellers</a> |{" "}
          <a href="/shop">Shop</a>
        </div>
      </footer>
    </div>
  );
}
