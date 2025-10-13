// app/sellers/[id]/page.tsx
import Link from "next/link";
import styles from "../../page.module.css";
import Image from "next/image";
import { getUserById, DetailedUser } from "../../lib/data"; 
import { notFound } from "next/navigation";

// Force dynamic rendering if necessary for data freshness/user context
export const dynamic = 'force-dynamic'; 

interface SellerPageProps {
    params: {
    id: string; 
    };
}

// ------------------------------------------------------------------
// This function will fetch the data for a single user/seller
// ------------------------------------------------------------------
export default async function SellerPage({ params }: SellerPageProps) {
    const sellerId = params.id; 

    let seller: DetailedUser | null;
    
    try {
        // Fetch the detailed user data using the ID from the URL
        seller = await getUserById(sellerId);
    } catch (e) {
        console.error(`Error fetching seller data for ID ${sellerId}:`, e);
        notFound(); 
    }

    // If fetch was successful but returned no user (e.g., ID not in DB)
    if (!seller) {
        notFound();
    }
    
    return (
        <main className={styles.pageContainer}> 
            <div className={styles.sellerDetailContainer}>
                
                <h2 className={styles.sellerShopName}>{seller.shop_name}</h2>
                <p className={styles.sellerTitle}>Specialty: {seller.title}</p>
                
                <div className={styles.sellerContentGrid}>
                    
                    {/* Seller Image */}
                    <div className={styles.sellerImageWrapper}>
                        <Image
                            src={seller.image}
                            alt={`Profile image for ${seller.name}`}
                            width={300}
                            height={300}
                            style={{ borderRadius: '8px', objectFit: 'cover' }}
                        />
                    </div>
                    <button className={styles.buttonPrimary}>Add to Cart</button>

                    {/* Seller Info */}
                    <div className={styles.sellerInfo}>
                        <h3 className={styles.sectionTitle}>About the Artisan</h3>
                        <p>Artisan Name: {seller.name}</p>
                        <p>Based in: {seller.country}</p>
                        <p>Contact: <Link href={`mailto:${seller.email}`}>{seller.email}</Link></p>
                        
                        <h3 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>Craft Focus</h3>
                        <p>Company/Studio: {seller.shop_name}</p>
                        <p>Unique Insight: {seller.description}</p>
                    </div>
                </div>
                
                <div className={styles.centerContent}>
                    <button className={styles.buttonPrimary}>Browse {seller.name}'s Products</button>
                </div>

            </div>
        </main>
    );
}