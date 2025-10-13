// src/app/lib/data.ts

// --------------------------
// Environment-based API URL
// --------------------------
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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

// Raw user data returned from API
export interface UserRaw {
    id: number;
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
    [key: string]: unknown;
  };
}

// --------------------------
// Fetch all users
// --------------------------
export async function getData(): Promise<UserRaw[]> {
  const res = await fetch(`${API_BASE}/users`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error(`Failed to fetch users. Status: ${res.status}`);
    throw new Error('Network response was not ok');
  }

  return res.json() as Promise<UserRaw[]>;
}

// --------------------------
// Fetch single user by ID
// --------------------------
export async function getUserById(id: string): Promise<DetailedUser> {
  const res = await fetch(`${API_BASE}/users/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch user with ID ${id}`);
  }

  const rawUser: UserRaw = await res.json();

  return {
    user_id: rawUser.user_id,
    shop_name: rawUser.shop_name ?? 'N/A',
    name: rawUser.name ?? 'Unknown',
    phone: rawUser.phone ?? '',
    rating: rawUser.rating ?? '0',
    price: rawUser.featuredproduct?.price ?? 0,
    title: rawUser.featuredproduct?.title ?? 'Untitled',
    image: rawUser.image ?? '',
    userimage: rawUser.userimage ?? '',
    email: rawUser.email ?? '',
    description: rawUser.description ?? '',
    artstory: rawUser.artstory ?? '',
    country: rawUser.country ?? '',
  };
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
