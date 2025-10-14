// app/sellers/[id]/page.tsx
import styles from "../../page.module.css";
import Image from "next/image";
import { getUserById, DetailedUser } from "../../lib/data"; 
import { notFound } from "next/navigation";
import Link from "next/link";

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
    const sellerId = Number(params.id);
    if (isNaN(sellerId)) notFound();

    const seller = await getUserById;
    
    try {
        // Fetch the detailed user data using the ID from the URL
        const seller = await getUserById(sellerId);
        if (!seller) {
        notFound();
    }
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
                            src={seller.userimage}
                            alt={`Profile image for ${seller.name}`}
                            width={300}
                            height={300}
                            style={{ borderRadius: '8px', objectFit: 'cover' }}
                        />
                    </div>
                    {/* Seller Info */}
                    <div className={styles.sellerInfo}>
                        <h2 className={styles.dark} style={{borderBottom: "2px solid brown" }}>About the Artisan</h2>
                        <h3 className={styles.dark} style={{color: "black", fontWeight: "bolder", fontSize:"larger"}}>{seller.name}</h3>
                        <p style={{textAlign: "right", fontStyle:"italic", fontWeight:"bolder"}}>{seller.country}</p>
                        <p>{seller.artstory}</p>
                        <p>Contact: <Link href={`mailto:${seller.email}`}>{seller.email}</Link></p>
                        <p>Unique Insight: {seller.description}</p>
                    </div>
                </div>
                
                <div className={styles.centerContent}>
                    <button className={styles.buttonPrimary}>Browse {seller.name} Products</button>
                </div>

            </div>
        </main>
    );
}