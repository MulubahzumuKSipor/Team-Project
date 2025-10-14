import styles from "../page.module.css";
import { getData, UserRaw } from "../lib/data"; // Only need getData here
import Image from "next/image";
import Link from "next/link";



export default async function Shop() {
  // Fetch data (assumed to be a list of products/sellers)
  const users: UserRaw[] = await getData(); 

  return (
    <div>

      <main style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 1rem" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", marginBottom: "1rem", textAlign: "center" }}>
          Shop Products
        </h2>

        {/* Product grid */}
        <div className={styles.productGrid}>
          {users && users.length > 0 ? (
            // 1. Map over 'user' array (not 'users')
            // 2. Filter out items with no valid ID to prevent /undefined links
            users
              .filter(user => user.user_id)
              .map((user) => (
                
                // 3. Move the Link component outside the productCard div.
                //    Use user.user_id for both the href and the key.
                <Link 
                  href={`/shop/${user.user_id}`} 
                  key={user.user_id} 
                  className={styles.productCard} // Apply card styling to the Link itself
                >
                  
                  {/* FIX: Remove the redundant <div className={styles.productCard} key={user.id}> 
                         as the Link already holds the key and styling. 
                         You should only render the card content here. */}
                    <Image
                      src={user.image ?? "/next.svg"}
                      width={100}
                      height={76}
                      alt={`Product image for ${user.name}`} // Improved alt text
                    />
                  
                    <h4>{user.name}</h4>
                    {/* Display shop name or price if available */}
                    <h5 className={styles.productPrice}>{user.shop_name}</h5>
                    {user.featuredproduct?.price && <p>${user.featuredproduct.price.toFixed(2)}</p>} 
                </Link>
              ))
          ) : (
            <div>No products available at the moment.</div>
          )}
        </div>
      </main>
    </div>
  );
}