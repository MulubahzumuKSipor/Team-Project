"use client";

import Link from "next/link";
import styles from "../app/page.module.css"


export default function Footer() {

  return (
    <footer className={styles.footer}>
        <p>&copy; 2025 Handcrafted Haven. Mulubahzumu Kemmeh Sipor. All rights reserved.</p>
        <div>
          <Link href="/about">About</Link> | <Link href="#">Contact</Link> |{" "}
          <Link href="#">Terms</Link>
        </div>
      </footer>
  );
}
