import styles from "../page.module.css";
import Image from "next/image";
import { getData, getUserById, UserRaw} from "../lib/data";
import Link from "next/link";

// Define TypeScript interfaces for data

interface UserData {
  user_id: number;
  id: number;
  shop_name: string;
  name: string;
  userimage: string;
  jsonb: {
    image: string;
  };
  user_data: {
    firstName: string;
    lastName: string;
    image: string;
  };
}

export default async function Sellers() {
  const user_data: UserRaw[] = await getData();
  

  return (
    <div>
      

      <main style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 1rem" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            marginBottom: "2rem",
            textAlign: "center"
          }}
        >
          Our Sellers
        </h2>

        

        {/* User Data Display */}
        {/* {user_data && user_data.length > 0 ? (
          <Image
            src={user_data[0].jsonb.image}
            alt={user_data[0].jsonb.shop_name}
            width={300}
            height={300}
          />
        ) : (
          <div>No user data found</div>
        )} */}

        {/* Featured Seller Display */}
         
            <div className={styles.productGrid}>
              {user_data && user_data.length > 0 ? (
                user_data.map((user) => (
                  <Link
                    href={`/sellers/${user.user_id}`} 
                    key={user.user_id} 
                    className={styles.productCard}
                  >
                    <div className={styles.productCard}>
                      <Image
                        src={user.userimage ?? "/next.svg"} // default image if undefined
                        width={100}
                        height={76}
                        alt={user.name ?? "Seller image"}
                      />
                      <h4>{user.name ?? "Unnamed Seller"}</h4>
                      <h5 className={styles.productPrice}>{user.shop_name ?? "No Shop Name"}</h5>
                    </div>
                  </Link>
                ))
              ) : (
                <div>No featured sellers found</div>
              )}
            </div>


      
        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button className={styles.buttonPrimary}>Become a Seller</button>
        </div>
      </main>
    </div>
  );
}
