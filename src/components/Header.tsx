"use client";

import Link from "next/link";
import styles from "../app/page.module.css";
import { useUser } from "@/app/lib/useUser";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/lib/CartContext";
import { useState } from "react"; // 1. Import useState for menu toggle

export default function Header() {
  const { user } = useUser();
  const router = useRouter();
  // 2. Get cart items and calculate total count
  const { cart } = useCart(); 
  const totalCartItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);
  
  // 3. State for the mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login'); // redirect after logout
    // Close menu on action
    setIsMenuOpen(false); 
  };

  const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
  };

  // Function to close the menu after a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.mainNav}> {/* Use new class name */}
      {/* 4. Logo/Brand */}
      <h1 className={styles.navBrand}>
        <Link href="/">Handcrafted Haven</Link>
      </h1>

      {/* 5. Hamburger Icon (Visible on mobile) */}
      <button 
          className={styles.hamburgerIcon} 
          onClick={toggleMenu} 
          aria-expanded={isMenuOpen} 
          aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5h16M4 12h16M4 19h16"/></svg>
      </button>

      {/* 6. Navigation Links - Toggled by state */}
      <div className={`${styles.navLinks} ${isMenuOpen ? styles.navOpen : ''}`}>
        <nav className={styles.desktopNav}> {/* Wrapper for desktop links */}
          <Link href="/" className={styles.navItem} onClick={handleLinkClick}>Home</Link>
          <Link href="/shop" className={styles.navItem} onClick={handleLinkClick}>Shop</Link>
          <Link href="/sellers" className={styles.navItem} onClick={handleLinkClick}>Sellers</Link>
          <Link href="/about" className={styles.navItem} onClick={handleLinkClick}>About</Link>
        </nav>
        
        {/* Button Group (Moved inside navLinks for mobile view placement) */}
        <div className={styles.navButtonGroup}> {/* Use new class name */}
          {user ? (
            <button onClick={handleLogout} className={styles.buttonPrimary}>
              Log Out
            </button>
          ) : (
            <Link href="/login" onClick={handleLinkClick}>
              <button className={styles.buttonPrimary}>Login</button>
            </Link>
          )}

          <Link href="/cart" className={styles.cartLink} onClick={handleLinkClick}>
            <button className={styles.buttonSecondary}>
              Cart ({totalCartItems}) {/* Display the count */}
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}