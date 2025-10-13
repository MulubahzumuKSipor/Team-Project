import styles from "../page.module.css";
import Image from "next/image";
import { getData } from "../lib/data";
import Link from "next/link";

interface UserData {
  id: number;
  user_id: number;
  shop_name?: string;
  name?: string;
  userimage?: string;
  jsonb?: {
    image?: string;
    shop_name?: string;
  };
  user_data?: {
    firstName?: string;
    lastName?: string;
    image?: string;
  };
}

export default async function Sellers() {
  const user_data: UserData[] = await getData();

  return (
    <div>
      <main style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 1rem" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Our Sellers
        </h2>

        <div className={styles.productGrid}>
          {user_data && user_data.length > 0 ? (
            user_data.map((user) => {
              const imgSrc =
                user.userimage || user.jsonb?.image || user.user_data?.image || "/placeholder.png";

              return (
                <Link href={`/sellers/${user.user_id}`} key={user.user_id} className={styles.productCard}>
                  <div>
                    <Image
                      src={imgSrc}
                      width={300}
                      height={200}
                      alt={user.name ?? "Seller image"}
                      // If images are remote and you don't want to add domains to next.config.js,
                      // you can use unoptimized, but prefer adding domains in next.config.js.
                      // unoptimized
                    />

                    <h4>{user.name ?? "Unnamed Seller"}</h4>
                    <h5 className={styles.productPrice}>{user.shop_name ?? user.jsonb?.shop_name ?? ""}</h5>
                  </div>
                </Link>
              );
            })
          ) : (
            <div>No featured sellers found</div>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button className={styles.buttonPrimary}>Become a Seller</button>
        </div>
      </main>
    </div>
  );
}
