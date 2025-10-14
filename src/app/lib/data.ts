import { supabase } from "./supabaseClient";

// --------------------------
// Interfaces / Types
// --------------------------
export interface FeaturedProduct {
  title: string;
  price: number;
  [key: string]: unknown; // Optional extra fields
}

export interface FeaturedUser {
  user_id: number;
  shop_name: string;
  name: string;
  image: string;
  featuredproduct: FeaturedProduct;
}

export interface UserRaw {
    user_id: number;
    shop_name?: string;
    name?: string;
    phone?: string;
    rating?: string;
    image?: string;
    userimage?: string;
    email?: string;
    description?: string;
    artstory?: string;
    country?: string;
    featuredproduct?: {
        title?: string;
        price?: number;
    };
}

export interface DetailedUser {
    user_id: number;
    shop_name: string;
    name: string;
    phone: string;
    rating: string;
    price: number;
    title: string;
    image: string;
    userimage: string;
    email: string;
    description: string;
    artstory: string;
    country: string;
}

// --------------------------
// Fetch all users
// --------------------------
// Fetch all users
export async function getData(): Promise<UserRaw[]> {
    const { data, error } = await supabase
        .from('users')
        .select('*');

    if (error) {
        console.error('Supabase fetch error:', error);
        throw new Error('Failed to fetch users');
    }

    return data as UserRaw[];
}

// Fetch single user by ID
export async function getUserById(userId: number): Promise<UserRaw | null> {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error('Supabase fetch error:', error);
        return null;
    }

    if(!data) return null;

    const detailedUser: DetailedUser = {
        user_id: data.user_id,
        shop_name: data.shop_name ?? 'N/A',
        name: data.name ?? 'Unknown',
        phone: data.phone ?? '',
        rating: data.rating ?? '0',
        price: data.featuredproduct?.price ?? 0,
        title: data.featuredproduct?.title ?? 'Untitled',
        image: data.image ?? '',
        userimage: data.userimage ?? '',
        email: data.email ?? '',
        description: data.description ?? '',
        artstory: data.artstory ?? '',
        country: data.country ?? '',
    };

    return detailedUser;
}
// --------------------------
// Fetch featured products (random 4 users)
// --------------------------
export async function getFeaturedProducts(): Promise<FeaturedUser[]> {
  const rawUsers: UserRaw[] = await getData();

  if (rawUsers.length === 0) return [];

  // Shuffle array using Fisher-Yates
  const usersToShuffle = [...rawUsers];
  for (let i = usersToShuffle.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [usersToShuffle[i], usersToShuffle[random]] = [usersToShuffle[random], usersToShuffle[i]];
  }

  const featuredUsersRaw = usersToShuffle.slice(0, 4);

  return featuredUsersRaw.map((user: UserRaw): FeaturedUser => ({
    user_id: user.user_id,
    shop_name: `${user.shop_name ?? 'N/A'} Shop`,
    name: user.name ?? 'Unknown',
    image: user.image ?? '',
    featuredproduct: {
      title: user.featuredproduct?.title ?? 'Untitled',
      price: user.featuredproduct?.price ?? 0,
      ...user.featuredproduct,
    },
  }));
}
