// app/sellers/[id]/page.tsx
import Link from "next/link";
import styles from "../../page.module.css";
import Image from "next/image";
import { getUserById } from "../../lib/data"; 
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
    const sellerId = Number(params.id);
    if (isNaN(sellerId)) notFound();

    const seller = await getUserById(sellerId);

    try {
        // Fetch the detailed user data using the ID from the URL
       const seller = await getUserById(sellerId);
        if (!seller) notFound();    
    } catch (e) {
        console.error(`Error fetching seller data for ID ${sellerId}:`, e);
        notFound(); 
    }

    
    return (
        <main className={styles.pageContainer}> 
            <div className={styles.sellerDetailContainer}>
                
                <h2 className={styles.sellerShopName}>{seller?.shop_name}</h2>
                <p className={styles.sellerTitle}>Specialty: {seller?.featuredproduct?.title}</p>
                
                <div className={styles.sellerContentGrid}>
                    
                    {/* Seller Image */}
                    <div className={styles.sellerImageWrapper}>
                        <Image
                            src={seller?.image ?? ""}
                            alt={`Profile image for ${seller?.name}`}
                            width={300}
                            height={300}
                            style={{ borderRadius: '8px', objectFit: 'cover' }}
                        />
                    </div>
                    <button className={styles.buttonPrimary}>Add to Cart</button>

                    {/* Seller Info */}
                    <div className={styles.sellerInfo}>
                        <h3 className={styles.sectionTitle}>About the Artisan</h3>
                        <p><b>Artisan Name:</b> {seller?.name}</p>
                        <p><b>Based in:</b> {seller?.country}</p>
                        <p style={{ borderBottom: '5px solid skyblue' }}>Contact: <Link href={`mailto:${seller?.email}`} >{seller?.email}</Link></p>
                        
                        <h3 className={styles.sectionTitle} >Craft Focus</h3>
                        <p><b>Company/Studio:</b> {seller?.shop_name}</p>
                        <p><b>Unique Insight:</b> {seller?.description}</p>
                    </div>
                </div>
                
                <div className={styles.centerContent}>
                    <button className={styles.buttonPrimary}>Browse {seller?.name} Products</button>
                </div>

            </div>
        </main>
    );
}