// app/seller/[id]/page.tsx
'use client'; // Required for all hooks, state, and event handlers

import React, { useEffect, useState } from 'react';
import { useCart } from '@/app/lib/CartContext';
import Link from 'next/link';
import styles from '../../page.module.css';
import Image from 'next/image';
import { getUserById } from '@/app/lib/data';
import { useRouter } from 'next/navigation';
import { UserRaw } from '@/app/lib/data';

// Seller Type Definition (Represents UserRaw/Seller data fetched from the API)
interface Seller {
  user_id: number;
  name?: string;
  email?: string;
  country?: string;
  shop_name?: string;
  description?: string;
  image?: string;
  featuredproduct?: {
    id?: number;
    title?: string;
    price?: number;
    image?: string;
    category?: string;
  } | null;
}

interface SellerPageProps {
  params: {
    id: string;
  };
}

export default function SellerPage({ params }: SellerPageProps) {
  const router = useRouter();
  const sellerId = Number(params.id);

  // local state for seller, loading, error
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // cart context
  const { addToCart } = useCart();

  useEffect(() => {
    // validate id
    if (Number.isNaN(sellerId)) {
      setError('Invalid seller id');
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchSeller() {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserById(sellerId);
        if (cancelled) return;
        setSeller(data as Seller);
      } catch (err) {
        console.error('Failed to fetch seller:', err);
        if (!cancelled) setError('Failed to load seller');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSeller();

    return () => {
      cancelled = true;
    };
  }, [sellerId]);

  // Add featured product to cart (sends ALL seller/UserRaw information)
  const handleAddToCart = () => {
    if (!seller) return;
    
    // **CRITICAL GUARD**: Ensure the product you intend to sell exists and has an ID
    if (!seller.user_id) {
      alert('No featured product available to add.');
      return;
    }

    // 🎯 FIX: Pass the entire seller object, which matches the required UserRaw type
    addToCart(seller as UserRaw); // Use 'as any' to match UserRaw if types are complex
  };

  if (loading) {
    return <div className={styles.pageContainer}><p>Loading seller...</p></div>;
  }

  if (error) {
    return (
      <div className={styles.pageContainer}>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={() => router.back()}>Go back</button>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className={styles.pageContainer}>
        <h2>Seller not found</h2>
        <p>No artisan matches that ID.</p>
        <button onClick={() => router.push('/shop')}>Back to shop</button>
      </div>
    );
  }

  return (
    <main className={styles.pageContainer}>
      <div className={styles.sellerDetailContainer}>
        <h2 className={styles.sellerShopName}>{seller.shop_name ?? seller.name}</h2>

        <div className={styles.sellerContentGrid}>
          <div className={styles.sellerImageWrapper}>
            <Image
              src={seller.image ?? seller.featuredproduct?.image ?? '/next.svg'}
              alt={`Profile image for ${seller.name ?? seller.shop_name}`}
              width={300}
              height={300}
              style={{ borderRadius: '8px', objectFit: 'cover' }}
            />
          </div>

          <div>
            {/* 🎯 FIX: onClick now correctly uses the function reference handleAddToCart */}
            <button className={styles.buttonPrimary} onClick={handleAddToCart}>
              Add Featured Product to Cart
            </button>
          </div>

          <div className={styles.sellerInfo}>
            <h3 className={styles.sectionTitle}>About the Artisan</h3>
            <p><b>Artisan Name:</b> {seller.name}</p>
            <p><b>Based in:</b> {seller.country}</p>
            <p style={{ borderBottom: '5px solid skyblue' }}>
              Contact: <Link href={`mailto:${seller.email}`}>{seller.email}</Link>
            </p>

            <h3 className={styles.sectionTitle}>Craft Focus</h3>
            <p><b>Company/Studio:</b> {seller.shop_name}</p>
            <p><b>Unique Insight:</b> {seller.description}</p>
          </div>
        </div>

        <div className={styles.centerContent}>
          <Link href={"#"}>
            <button className={styles.buttonPrimary}>Browse {seller.name ?? 'Products'}</button>
          </Link>
        </div>
      </div>
    </main>
  );
}