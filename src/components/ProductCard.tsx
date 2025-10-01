"use client";

import styles from "@/app/page.module.css";

type ProductCardProps = {
  title: string;
  price: number;
};

export default function ProductCard({ title, price }: ProductCardProps) {
  return (
    <div className={styles.productCard}>
      <div
        style={{
          height: "150px",
          background: "#eee",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      />
      <h4>{title}</h4>
      <p>${price}.00</p>
      <button className={styles.buttonPrimary}>Add to Cart</button>
    </div>
  );
}
