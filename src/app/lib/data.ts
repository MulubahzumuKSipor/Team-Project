export interface FeaturedUser {
    user_id: number;
    shop_name: string;
    name: string;
    image: string;
    featuredproduct: JSON;
}

export interface DetailedUser {
    user_id: number,
    shop_name: string,
    name: string,
    phone: string,
    rating: string,
    price: number,
    title: string, // <-- Added comma here
    image: string,
    userimage: string,
    email: string,
    description: string,
    artstory: string,
    country: string
}

export interface UserRaw {
  user_id: number;
  shop_name?: string;
  name?: string;
  phone?: string;
  rating?: string;
  featuredproduct?: Record<string, unknown> | null;
  price?: number;
  title?: string;
  image?: string;
  userimage?: string;
  email?: string;
  description?: string;
  artstory?: string;
  country?: string;
}

export async function getData() {
    // 1. Add revalidation option to the fetch call
    const fetchData = await fetch('http://localhost:5000/users', { 
        // This tells Next.js to revalidate the data every 3600 seconds (1 hour)
        next: { revalidate: 3600 } 
    });

    if (!fetchData.ok) {
        // Log the status for better debugging on the server
        console.error(`Failed to fetch users. Status: ${fetchData.status}`);
        throw new Error('Network response was not ok');
    }
    
    // The API might return an object like { users: [...] } or just an array [...]
    const result = await fetchData.json(); 
    
    // Assuming the API returns an array of users directly, like your initial data
    return result as Promise<UserRaw[]>; 
}

// ----------------------------------------------------------------------------------
// FIX: Removed the double call to await fetchData.json() and used the result 
// ----------------------------------------------------------------------------------
export async function getUserById(id: string): Promise<DetailedUser> {
    const fetchData = await fetch(`http://localhost:5000/users/${id}`);
    if (!fetchData.ok) {
        throw new Error('Network response was not ok');
    }
    
    // FIX 1: Call .json() only once and store the result
    const rawUser = await fetchData.json(); 

    // FIX 2: Removed the redundant 'const data = await fetchData.json();' line
    
    // Map the raw user data to the clean DetailedUser interface
    return {
        user_id: rawUser.user_id,
        shop_name: rawUser.shop_name,
        name: rawUser.name,
        phone: rawUser.phone,
        rating: rawUser.rating,
        price: rawUser.featuredproduct.price,
        title: rawUser.featuredproduct.title,
        image: rawUser.image,
        userimage: rawUser.userimage, // Using userimage as the high-res profile picture
        email: rawUser.email,
        description: rawUser.description,
        artstory: rawUser.artstory,
        country: rawUser.country,
    };
}
// ----------------------------------------------------------------------------------


export async function getFeaturedProducts(): Promise<FeaturedUser[]> {
    // 1. AWAIT the asynchronous call to fetch data
    const rawUsers: UserRaw[] = await getData(); 

    if (rawUsers.length === 0) {
        return [];
    }

    // --- Shuffling Logic (Fisher-Yates) ---
    // 2. Clone the array before shuffling to ensure the original (cached) array 
    const usersToShuffle = [...rawUsers];

    for (let i = usersToShuffle.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        
        // 3. CORRECT array destructuring
        [usersToShuffle[i], usersToShuffle[random]] = [usersToShuffle[random], usersToShuffle[i]];
    }
    // ----------------------------------------

    // 4. Select the first 4 elements from the shuffled array
    const featuredUsersRaw = usersToShuffle.slice(0, 4);

    // 5. Map the raw API user data to your defined FeaturedUser interface
    return featuredUsersRaw.map(user => ({
        user_id: user.user_id,
        shop_name: `${user.shop_name || 'N/A'} Shop`, // Example mapping
        name: user.name, // Example mapping
        image: user.image, // Assuming API uses 'image'
        featuredproduct: user.featuredproduct
    }));
}