'use client';

import styles from "../page.module.css";
import { getData, UserRaw } from "../lib/data"; // Only need getData here
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../lib/CartContext";


export default function Shop() {
  // Set up the page to filter, search and paginate
  const [users, setUsers] = useState<UserRaw[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [page, setPage] = useState(1);
  const limit = 5
  const [total, setTotal] = useState(0);
  const {cart, addToCart} = useCart();
  

  // Fetch data (assumed to be a list of products/sellers)
  useEffect(()=>{
    const fetchProducts = async()=>{
      const data: UserRaw[] =  await getData();
      setUsers(data);
      setTotal(data.length);
    }
    fetchProducts();
  }, []);
  

  const filteredProducts = users
    .filter(u => u.user_id)
    .filter(u => u.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(u => !categoryFilter || u.featuredproduct?.title === categoryFilter );
  
  const totalPages = Math.ceil(filteredProducts.length / limit);
  const paginatedUsers = filteredProducts.slice((page -1) * limit, page * limit);

  return (
    <div>

      <main style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 1rem" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", marginBottom: "1rem", textAlign: "center" }}>
          Shop Products
        </h2>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            className={styles.input}
          />
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
            className={styles.input}
          >
            <option value="">All Categories</option>
            <option value="Art">Art</option>
            <option value="Craft">Craft</option>
            <option value="Jewelry">Jewelry</option>
          </select>
        </div>
        {/* Product grid */}
        {/* <div className={styles.productGrid}>
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
                    {/* <Image
                      src={user.image ?? "/next.svg"}
                      width={100}
                      height={76}
                      alt={`Product image for ${user.name}`} // Improved alt text
                    />
                  
                    <h4>{user.name}</h4>
                    {/* Display shop name or price if available */}
                    {/* <h5 className={styles.productPrice}>{user.shop_name}</h5>
                    {user.featuredproduct?.price && <p>${user.featuredproduct.price.toFixed(2)}</p>} 
                </Link> */}
              {/* )) */} 
          {/* ) : (
            <div>No products available at the moment.</div>
          )}
        </div> */}
        <div className={styles.productGrid}>
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map(user => (
              <div className={styles.productCard} key={user.user_id}>
                  
                <Link
                  href={`/shop/${user.user_id}`}
                  key={user.user_id}
                >
                  <Image
                    src={user.image ?? "/next.svg"}
                    width={100}
                    height={76}
                    alt={`Product image for ${user.name}`}
                  />
                  <h4>{user.name}</h4>
                  <h5 className={styles.productPrice} style={{color: "black"}}>{user.shop_name}</h5>
                </Link>
                  {user.featuredproduct?.price && <p>${user.featuredproduct.price.toFixed(2)}</p>}
                  <button className={styles.buttonPrimary} onClick={() => addToCart(user)}>Add to Cart</button>
              </div>    
            ))
          ) : (
            <div>No products found.</div>
          )}
        </div>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", justifyContent: "center" }}>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={styles.buttonSecondary}
          >
            Prev
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className={styles.buttonSecondary}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}