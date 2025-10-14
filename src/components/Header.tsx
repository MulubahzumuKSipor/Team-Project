"use client";

import Link from "next/link";
import styles from "../app/page.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
    <h1
        style={{
            color: "var(--color-primary)",
            fontFamily: "var(--font-family-header)", /* Using a CSS variable here */
        }}
    >
        <Link href="/">Handcrafted Haven</Link>
    </h1>
    
    <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/sellers">Sellers</Link>
        <Link href="/about">About</Link>
    </nav>
    
    {/* New Button Group Container */}
    <div className={styles.buttonGroup}>
        {/* Login Button uses Primary style (CTA) */}
        <Link href={'/login'}>
            <button className={styles.buttonPrimary}>Login</button>
        </Link>
        
        {/* Cart Button uses Secondary style (less dominant) */}
        <Link href={'/cart'}>
            <button className={styles.buttonSecondary}>Cart</button>
        </Link>
    </div>
</header> );
}
