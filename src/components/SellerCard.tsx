"use client";

import styles from "@/app/page.module.css";

type SellerCardProps = {
  name: string;
  location: string;
  specialty: string;
};

export default function SellerCard({ name, location, specialty }: SellerCardProps) {
  return (
    <div className={styles.productCard}>
      <div
        style={{
          height: "120px",
          width: "120px",
          margin: "0 auto 1rem auto",
          borderRadius: "50%",
          background: "#ddd",
        }}
      />
      <h4>{name}</h4>
      <p>{location}</p>
      <p style={{ fontStyle: "italic", color: "#777" }}>{specialty}</p>
    </div>
  );
}
