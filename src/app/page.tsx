import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {FeaturedUser, getFeaturedProducts } from "./lib/data";



export default async function Home() {
  const featuredProducts: FeaturedUser[] = await getFeaturedProducts();
  
  const supabase = createServerComponentClient({ cookies });

  // Fetch the session on the server
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    // If no session, redirect to the login page
    redirect('/login');
  }

  return (
    <div>

      {/* Hero */}
      <section className={styles.hero}>
        <h2>Discover Handmade Treasures</h2>
        <p>
          Support artisans, shop unique crafts, and find one-of-a-kind
          creations.
        </p>
        <Link href={"/shop"}><button className={styles.buttonPrimary}>Shop Now</button></Link>
      </section>

      {/* Featured Products Section */}
      <main className={styles.productsSection}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <p className={styles.sectionSubtitle}>
          Our best picks, crafted with love and care
        </p>
        <div className={styles.productGrid}>
          {/* Loop over the 4 randomly selected products */}
          {featuredProducts.length > 0 ? featuredProducts.map((product) => (
            <div key={product.user_id} className={styles.productCard}>
              <div>
                <Image 
                  src={product.image} 
                  alt={product.name} // Alt text for accessibility
                  width={150} 
                  height={150} 
                  style={{ objectFit: "cover" }} // Optional styling
                />
              </div>
              {/* Display the seller's full name (as shop name) */}
              <h4>{product.name}</h4>
              {/* Display the company title (as a product description) */}
              <p className={styles.productPrice}>{product.shop_name}</p>
              
              <button className={styles.buttonPrimary}>Add to Cart</button>
            </div>
          )):(
            <p>Loading products...</p>
          )}
        </div>
      </main>      
    </div>
  );
}
