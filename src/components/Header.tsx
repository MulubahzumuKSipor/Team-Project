"use client";

import Link from "next/link";
import styles from "../app/page.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
        <h1
          style={{
            color: "var(--color-primary)",
            fontFamily: "'Playfair Display', serif",
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
         <Link href={'/login'}><button className={styles.loginButton}>Login</button></Link>
          <Link href={'/cart'}><button className={styles.cartButton}>Cart</button></Link>
      </header>  );
}
